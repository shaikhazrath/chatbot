'use client'
import { useState, useEffect } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'
import { toast } from 'react-hot-toast'

const FloatingChat = ({ projectId }) => {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [projectData, setProjectData] = useState(null)
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return

      try {
        const response = await fetch(`/api/project/${projectId}`)
        const data = await response.json()
        console.log(data)
        if (!response.ok) {
          throw new Error(data.error || 'Failed to load project')
        }

        setProjectData(data)
      } catch (error) {
        toast.error(error.message)
      }
    }

    fetchProject()
  }, [projectId])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    try {
      setIsLoading(true)
      const userMessage = {
        id: Date.now(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setInputValue('')

      const response = await fetch('/api/genai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputValue,
          transcriptId: projectData?.transcript_id,
        }),
      })

      const data = await response.json()
      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: data.response,
            sender: 'bot',
            timestamp: new Date(),
          },
        ])
      } else {
        throw new Error(data.message || 'Something went wrong')
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Chat Icon */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Box */}
      {isChatOpen && (
        <div className="w-[350px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-200">
            <h2 className="text-sm font-medium">Chat Preview</h2>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Window */}
          <div className="h-[300px] overflow-y-auto px-4 py-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="block text-xs text-gray-500 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 px-4 py-3">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FloatingChat