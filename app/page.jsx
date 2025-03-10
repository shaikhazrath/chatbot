'use client'
import FloatingChat from "@/components/FloatingChat";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Home() {
  const [email, setEmail] = useState("");
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden relative">
      {/* Gradient orbs/balls */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-pink-400 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      
      {/* Navbar */}
      <nav className="backdrop-blur-md bg-white/70 border-b border-gray-200 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">ChatScribe</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <a href="#features" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Features</a>
                <a href="#demo" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Demo</a>
                <a href="#pricing" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
                <a href="#docs" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Docs</a>
              </div>
            </div>
            <div>
              <button onClick={()=>router.push('/auth')} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  AI-Powered Chatbot
                </span>
                <br />
                <span>For Your Website</span>
              </h1>
              <p className="text-xl text-gray-600">
                Transform your website content into an intelligent customer support chatbot. 
                Just provide your URL, and we'll do the rest.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
              
                <button onClick={()=>router.push('/auth')} className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition duration-300">
                  Get Started
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-8 h-8 rounded-full bg-gray-${i * 100 + 100} border-2 border-white`}></div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">Trusted by 1000+ companies</p>
              </div>
            </div>
            <div className="relative backdrop-blur-xl bg-white/30 p-4 rounded-2xl border border-gray-200 shadow-xl">
              <div className="aspect-video rounded-xl overflow-hidden relative bg-black">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-blue-600 border-b-8 border-b-transparent ml-1"></div>
                  </button>
                </div>
                <Image 
                  src="/api/placeholder/800/450" 
                  alt="Demo Video Thumbnail" 
                  width={800} 
                  height={450}
                  layout="responsive"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered solution turns your website content into an intelligent 
              customer support assistant in minutes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Scraping",
                description: "Automatically extracts all relevant content from your website to build a knowledge base",
                icon: "📊"
              },
              {
                title: "AI-Powered Responses",
                description: "Uses advanced natural language processing to understand and respond to customer queries",
                icon: "🤖"
              },
              {
                title: "Easy Integration",
                description: "Simple NPM package that adds a chat widget to any corner of your website",
                icon: "🔌"
              },
              {
                title: "Customizable Design",
                description: "Match the chatbot's appearance to your brand identity",
                icon: "🎨"
              },
            
              {
                "title": "Personalized Recommendations",
                "description": "Provides tailored suggestions based on user behavior.",
                "icon": "🔍"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="backdrop-blur-md bg-white/50 rounded-xl border border-gray-200 p-6 hover:shadow-lg transition duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      {/* <section id="demo" className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                See It In Action
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch how easy it is to create your own AI customer support assistant
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/30 p-6 rounded-2xl border border-gray-200 shadow-xl">
            <div className="aspect-video rounded-xl overflow-hidden relative bg-black">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
                  <div className="w-0 h-0 border-t-10 border-t-transparent border-l-16 border-l-blue-600 border-b-10 border-b-transparent ml-1"></div>
                </button>
              </div>
              <Image 
                src="/api/placeholder/1200/675" 
                alt="Demo Video" 
                width={1200} 
                height={675}
                layout="responsive"
              />
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium text-lg hover:shadow-lg transition duration-300">
              Try It For Free
            </button>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">ChatScribe</span>
              <p className="mt-4 text-gray-600">
                Transform your website content into an intelligent customer support chatbot.
              </p>
            </div>
            
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Integrations", "Enterprise", "Security"]
              },
              {
                title: "Resources",
                links: ["Documentation", "API", "Guides", "Blog", "Support"]
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Contact", "Partners", "Legal"]
              }
            ].map((column, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900 mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-600 hover:text-gray-900">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <FloatingChat projectId="9b0f8753-d0ee-4493-83e3-35dc2be1b15c" />

          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">© 2025 ChatScribe. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Twitter", "LinkedIn", "GitHub", "Discord"].map((social, i) => (
                <a key={i} href="#" className="text-gray-600 hover:text-gray-900">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}