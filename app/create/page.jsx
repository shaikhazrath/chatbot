'use client'
import { useState, useEffect } from 'react'
import { Globe, Upload, Command, Copy } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

export default function ModernChatbotSetup() {
  const [formData, setFormData] = useState({
    websiteUrl: '',
    botname: '',
    model: 'claude-3-5-sonnet',
    temperature: 0.7,
    maxTokens: 1000
  })

  const [scrapedData, setScrapedData] = useState({
    scrapedUrls: [],
    transcriptId: null
  }) 

  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [userProjects, setUserProjects] = useState([])
  const [urlError, setUrlError] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user`, {
          method: 'GET',
          credentials: 'include', // Needed for session cookies
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user')
        }

        const userData = await response.json()
        setUser(userData)
      } catch (error) {
        console.error('Error fetching user:', error)
        toast.error('Failed to fetch user details')
      }
    }

    fetchUser()
  }, [])

  useEffect(() => {
    const fetchUserProjects = async () => {
      if (!user?._id) return

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
          method: 'GET',
          credentials: 'include', // Needed for session cookies
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }

        const projectData = await response.json()
        setUserProjects(projectData || [])
      } catch (error) {
        console.error('Error fetching user projects:', error)
        toast.error('Failed to fetch projects')
      }
    }

    fetchUserProjects()
  }, [user])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setUrlError('')
  }

  const handleScrapeWebsite = async () => {
    const { websiteUrl, botname } = formData
    if (!websiteUrl || !/^https?:\/\//.test(websiteUrl)) {
      setUrlError('Please enter a valid URL starting with http/https')
      return
    }

    try {
      setIsLoading(true)
      setUrlError('')
      
      // First scrape the website
      const scrapeResponse = await fetch('/api/webscrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: websiteUrl })
      })


      const scrapeResult = await scrapeResponse.json()
      
      if (!scrapeResponse.ok) {
        throw new Error(scrapeResult.message || "Failed to scrape website")
      }
      
      const { allurls, transcriptId } = scrapeResult

      // Now create a new project using our API
      const projectResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: botname,
          transcript_id: transcriptId
        })
      })

      const projectResult = await projectResponse.json()
      
      if (!projectResponse.ok) {
        throw new Error(projectResult.msg || "Failed to save project")
      }

      toast.success('Website scraped successfully!')
      setScrapedData({ scrapedUrls: allurls, transcriptId })

      // Fetch updated projects
      const updatedProjectsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      })

      if (!updatedProjectsResponse.ok) {
        throw new Error("Failed to fetch updated projects")
      }

      const updatedProjects = await updatedProjectsResponse.json()
      setUserProjects(updatedProjects || [])
      
    } catch (error) {
      console.error(error)
      toast.error(error.message || "An error occurred while scraping")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  return (
    <div className="h-screen bg-white p-5 overflow-hidden text-black">
      {/* Header */}
      <div className="flex items-center mb-8 space-x-3">
        <Command className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold">Create Bot</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8">
        {/* Left Column - Existing Projects */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-medium mb-4 flex items-center">
              Existing Projects
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userProjects.length > 0 ? (
                userProjects.map((project, index) => (
                  <Link href={`/create/${project._id}`} key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{project.name}</h3>
                    
                    <p className="text-xs text-gray-500">
                      Created: {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500">
                  No projects found
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Website Submission */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-medium flex items-center">
            <Globe className="w-6 h-6 mr-2 text-blue-600" />
            New Project Setup
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Website URL
              </label>
              <div className="relative">
              <input
                  type="text"
                  value={formData.botname}
                  onChange={(e) => handleInputChange('botname', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none mb-5
                    `}
                  placeholder="bot name"
                />
                <input
                  type="text"
                  value={formData.websiteUrl}
                  onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none 
                    ${urlError ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                  placeholder="https://example.com"
                />
                {urlError && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>
              {urlError && <p className="mt-2 text-sm text-red-600">{urlError}</p>}
            </div>

            <button
              onClick={handleScrapeWebsite}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg 
                hover:bg-blue-700 transition-colors disabled:bg-gray-400 
                flex items-center justify-center space-x-2"
            >
              {isLoading && (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              <span>{isLoading ? 'Scraping...' : 'Submit URL'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper component for exclamation icon
function ExclamationCircleIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}