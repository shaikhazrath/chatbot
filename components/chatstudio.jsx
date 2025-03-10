'use client'
import { useState } from 'react'
import { 
  Globe, 
  Upload, 
  Send, 
  X, 
  MessageSquare,
  ChevronDown, 
  Sliders,
  Command
} from 'lucide-react'

export default function ModernChatbotSetup() {
  const [formData, setFormData] = useState({
    websiteUrl: '',
    documents: [],
    model: 'claude-3-5-sonnet',
    temperature: 0.7,
    maxTokens: 1000,
    chatHistory: []
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleChatSubmit = (message) => {
    const newChatHistory = [
      ...formData.chatHistory,
      { role: 'user', content: message }
    ]
    
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        chatHistory: [
          ...newChatHistory,
          { 
            role: 'assistant', 
            content: `This is a response using the ${formData.model} model.`
          }
        ]
      }))
    }, 800)
    
    setFormData(prev => ({
      ...prev,
      chatHistory: newChatHistory
    }))
  }

  const removeDocument = (index) => {
    const newDocuments = [...formData.documents];
    newDocuments.splice(index, 1);
    handleInputChange('documents', newDocuments);
  }

  return (
    <div className="h-screen bg-white flex overflow-hidden text-black">
      {/* Left Column - Configuration */}
      <div className="w-1/2 p-5 overflow-y-auto">
        <div className="flex items-center mb-8 space-x-2">
          <Command className="w-6 h-6 text-gray-600" />
          <h1 className="text-xl font-bold">Chatbot Studio</h1>
        </div>
        
        {/* Website URL Card */}
        <div className="mb-6 border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
          <div className="border-b border-gray-200 px-5 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-gray-500" />
              <h2 className="font-medium">Website Source</h2>
            </div>
          </div>
          
          <div className="p-5">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-blue-500">
              <div className="flex items-center">
                <input
                  type="text"
                  value={formData.websiteUrl}
                  onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                  className="flex-1 bg-white border-0 outline-none py-3 px-2 text-black placeholder-gray-400"
                  placeholder="example.com"
                />
              </div>
            </div>
            <button
                 className="w-full mt-5 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add URL
            </button>
          </div>
        </div>
        
        {/* Model Settings Card */}
        <div className="border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
          <div className="border-b border-gray-200 px-5 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-gray-500" />
              <h2 className="font-medium">Model Settings</h2>
            </div>
          </div>
          
          <div className="p-5 space-y-5">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                AI Model
              </label>
              <div className="relative">
                <select
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="claude-3-5-sonnet">Gemini Ai</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-gray-600">
                  Temperature
                </label>
                <span className="text-sm text-black">{formData.temperature}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={formData.temperature}
                onChange={(e) => handleInputChange('temperature', parseFloat(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Precise</span>
                <span>Creative</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Max Tokens
              </label>
              <input
                type="number"
                value={formData.maxTokens}
                onChange={(e) => handleInputChange('maxTokens', parseInt(e.target.value))}
                className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <button
              className="w-full mt-3 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              Deploy Chatbot
            </button>
          </div>
        </div>
      </div>
      
      {/* Right Column - Chat Interface */}
      <div className="w-1/2 border-l border-gray-200 flex flex-col bg-gray-50">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-gray-500" />
            <h2 className="font-medium">Chat Preview</h2>
          </div>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto">
          {formData.chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="bg-white rounded-full p-3 mb-3">
                <MessageSquare className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-sm text-gray-500">
                Test your AI assistant by sending a message
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.chatHistory.map((message, index) => (
                <div 
                  key={index} 
                  className={`${
                    message.role === 'user' 
                      ? 'bg-white ml-6' 
                      : 'bg-gray-100 border border-gray-200 mr-6'
                  } p-3 rounded-lg text-sm`}
                >
                  {message.content}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              const message = e.target.elements.message.value
              if (message.trim()) {
                handleChatSubmit(message)
                e.target.elements.message.value = ''
              }
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              name="message"
              placeholder="Type a message..."
              className="flex-1 bg-white border border-gray-200 rounded-lg py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}