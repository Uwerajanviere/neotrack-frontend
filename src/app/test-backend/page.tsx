'use client'

import { useState, useEffect } from 'react'
import { babiesAPI, authAPI } from '../../lib/api'

export default function TestBackend() {
  const [status, setStatus] = useState('Testing connection...')
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    addLog('Starting backend connection test...')
    
    try {
      // Test login endpoint
      addLog('Testing login endpoint...')
      await authAPI.login('test@test.com', 'test123', 'NURSE')
      addLog('✅ Login endpoint reachable')
    } catch (error: any) {
      addLog(`❌ Login test failed: ${error.message}`)
    }

    try {
      // Test babies endpoint
      addLog('Testing babies endpoint...')
      await babiesAPI.getAll()
      addLog('✅ Babies endpoint reachable')
    } catch (error: any) {
      addLog(`❌ Babies test failed: ${error.message}`)
    }

    setStatus('Connection test complete')
    addLog('Backend connection test completed')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Backend Connection Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2">Status: {status}</h2>
          <p className="text-gray-600">Backend URL: https://neotrack-backend-70bl.onrender.com</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Test Logs</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm h-64 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
          </div>
        </div>

        <button
          onClick={testConnection}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retest Connection
        </button>
      </div>
    </div>
  )
}
