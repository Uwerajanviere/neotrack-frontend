'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Baby, BabyStatus, Alert } from '../../types'
import { babiesAPI, alertsAPI } from '../../lib/api'

// Mock data - replace with API calls
const mockBabies: Baby[] = [
  {
    id: 1,
    name: 'Baby Jean',
    gender: 'Male',
    birthWeight: 2.1,
    gestationalAge: 34,
    diagnosis: 'Premature birth',
    status: 'STABLE',
    admissionDate: '2024-01-15',
    parentId: 1,
  },
  {
    id: 2,
    name: 'Baby Marie',
    gender: 'Female',
    birthWeight: 1.8,
    gestationalAge: 32,
    diagnosis: 'Respiratory distress',
    status: 'CRITICAL',
    admissionDate: '2024-01-16',
    parentId: 2,
  },
  {
    id: 3,
    name: 'Baby Paul',
    gender: 'Male',
    birthWeight: 2.5,
    gestationalAge: 36,
    diagnosis: 'Jaundice',
    status: 'IMPROVING',
    admissionDate: '2024-01-14',
    parentId: 3,
  },
]

const mockAlerts: Alert[] = [
  {
    id: 1,
    babyId: 2,
    shiftLogId: 1,
    type: 'LOW_TEMP',
    message: 'Temperature too low: 35.1°C',
    status: 'ACTIVE',
    createdAt: '2024-01-17T08:30:00Z',
  },
  {
    id: 2,
    babyId: 2,
    shiftLogId: 1,
    type: 'LOW_WEIGHT',
    message: 'Weight below threshold: 1.7kg',
    status: 'ACTIVE',
    createdAt: '2024-01-17T08:30:00Z',
  },
]

// Mock chart data
const weightData = [
  { date: '01-14', weight: 2.5 },
  { date: '01-15', weight: 2.48 },
  { date: '01-16', weight: 2.52 },
  { date: '01-17', weight: 2.55 },
]

const temperatureData = [
  { date: '01-14', temp: 36.8 },
  { date: '01-15', temp: 36.6 },
  { date: '01-16', temp: 36.9 },
  { date: '01-17', temp: 35.1 },
]

export default function DoctorDashboard() {
  const router = useRouter()
  const [babies, setBabies] = useState<Baby[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [selectedBaby, setSelectedBaby] = useState<Baby | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [babiesData, alertsData] = await Promise.all([
        babiesAPI.getAll(),
        alertsAPI.getAll()
      ])
      setBabies(babiesData)
      setAlerts(alertsData)
    } catch (err) {
      setError('Failed to load data')
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: BabyStatus) => {
    switch (status) {
      case 'STABLE':
        return 'status-stable'
      case 'CRITICAL':
        return 'status-critical'
      case 'IMPROVING':
        return 'status-improving'
      default:
        return 'status-stable'
    }
  }

  const handleViewDetails = (babyId: number) => {
    router.push(`/baby/${babyId}`)
  }

  const activeAlerts = alerts.filter(alert => alert.status === 'ACTIVE')

  return (
    <div className="min-h-screen bg-medical-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">NeoTrack</h1>
              <span className="ml-4 text-sm text-gray-600">Doctor Dashboard</span>
            </div>
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts Section */}
        {activeAlerts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4">🚨 Active Alerts</h2>
            <div className="space-y-3">
              {activeAlerts.map((alert) => (
                <div key={alert.id} className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-red-800">{alert.message}</p>
                      <p className="text-sm text-red-600 mt-1">
                        Baby #{alert.babyId} • {new Date(alert.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button className="text-red-600 hover:text-red-800">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight Trend (Last 4 Days)</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-gray-500">Weight Chart</p>
                <div className="mt-4 space-y-2 text-sm">
                  {weightData.map((data, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{data.date}:</span>
                      <span className="font-medium">{data.weight}kg</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Temperature Trend (Last 4 Days)</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-gray-500">Temperature Chart</p>
                <div className="mt-4 space-y-2 text-sm">
                  {temperatureData.map((data, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{data.date}:</span>
                      <span className={`font-medium ${data.temp < 36.5 ? 'text-red-600' : 'text-gray-900'}`}>
                        {data.temp}°C
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Babies Table */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">All Babies</h2>
          <div className="card overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Baby
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weight
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gestational Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Diagnosis
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {babies.map((baby) => (
                  <tr key={baby.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{baby.name}</div>
                        <div className="text-sm text-gray-500">ID: #{baby.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {baby.birthWeight} kg
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {baby.gestationalAge} weeks
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {baby.diagnosis}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusColor(baby.status)}>
                        {baby.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(baby.id)}
                        className="text-medical-blue hover:text-blue-600"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{babies.length}</p>
              <p className="text-sm text-gray-600 mt-1">Total Babies</p>
            </div>
          </div>
          <div className="card">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {babies.filter(b => b.status === 'STABLE').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Stable</p>
            </div>
          </div>
          <div className="card">
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">
                {babies.filter(b => b.status === 'CRITICAL').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Critical</p>
            </div>
          </div>
          <div className="card">
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">{activeAlerts.length}</p>
              <p className="text-sm text-gray-600 mt-1">Active Alerts</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
