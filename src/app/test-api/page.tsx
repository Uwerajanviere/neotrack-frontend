'use client'

import { useState } from 'react'

export default function TestAPIPage() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setResult('Testing connection...')
    
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api'
      
      // Test basic connection
      const response = await fetch(`${API_BASE_URL}/babies`)
      
      if (response.ok) {
        const data = await response.json()
        setResult(`✅ SUCCESS! Connected to backend. Found ${data.length} babies.`)
      } else {
        setResult(`❌ HTTP Error: ${response.status} - ${response.statusText}`)
      }
    } catch (error) {
      setResult(`❌ Connection Failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const checkEnvironment = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    
    setResult(`Environment Variables:
NEXT_PUBLIC_API_URL: ${apiUrl || 'NOT SET'}
NEXT_PUBLIC_API_BASE_URL: ${apiBaseUrl || 'NOT SET'}

Current URL: ${window.location.href}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Backend Connection Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="flex space-x-4">
            <button
              onClick={testConnection}
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Backend Connection'}
            </button>
            
            <button
              onClick={checkEnvironment}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Check Environment
            </button>
          </div>
          
          {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <pre className="text-sm whitespace-pre-wrap">{result}</pre>
            </div>
          )}
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Integration Checklist</h2>
          <ul className="space-y-2 text-sm">
            <li>✅ Frontend running on http://localhost:3000</li>
            <li>🔄 Backend IP configured in .env.local</li>
            <li>🔄 Backend has CORS enabled</li>
            <li>🔄 Backend running on 0.0.0.0 (not localhost)</li>
            <li>🔄 API endpoints exist and working</li>
            <li>🔄 Network/firewall allows connection</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
