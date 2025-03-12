'use client'
import { useState, useEffect } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import { toast } from 'react-hot-toast'

const ChatPreview = ({ params }) => {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [projectData, setProjectData] = useState(null)

  useEffect(() => {
    const fetchProject = async () => {
      const { id } = await params // Extract project ID from params
      console.log(id)

      if (!id) return

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${id}`, {
          method: 'GET',
          credentials: 'include',

          headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
          throw new Error('Failed to load project')
        }

        const data = await response.json()
        setProjectData(data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching project:', error)
        toast.error('Failed to load project')
      }
    }

    fetchProject()
  }, [params])

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
console.log(projectData.transcript_id)
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
      console.error('Error sending message:', error)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen bg-white p-5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center mb-8 space-x-3">
        <MessageCircle className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold">Chat Preview</h1>
      </div>

      {/* Chat Container */}
      <div className="flex h-[calc(100vh-12rem)]">
        <div className="w-full bg-white border border-gray-200 rounded-xl p-6">
          {/* Chat Window */}
          <div className="h-[calc(100%-60px)] overflow-y-auto mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                } mb-4`}
              >
                <div
                  className={`max-w-[75%] p-4 rounded-lg ${
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

          {/* Message Input */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
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
    </div>
  )
}

export default ChatPreview