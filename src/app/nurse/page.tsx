'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Baby, BabyStatus } from '../../types'
import { babiesAPI } from '../../lib/api'

export default function NurseDashboard() {
  const router = useRouter()
  const [babies, setBabies] = useState<Baby[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadBabies()
  }, [])

  const loadBabies = async () => {
    try {
      setLoading(true)
      const data = await babiesAPI.getAll()
      setBabies(data)
    } catch (err) {
      setError('Failed to load babies data')
      console.error('Error loading babies:', err)
    } finally {
      setLoading(false)
    }
  }

  // Demo data for presentation
  const demoBabies = [
    {
      id: 1,
      name: 'Baby Jean',
      gender: 'Male',
      birthWeight: 2.1,
      gestationalAge: 34,
      diagnosis: 'Premature birth',
      status: 'STABLE' as BabyStatus,
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
      status: 'CRITICAL' as BabyStatus,
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
      status: 'IMPROVING' as BabyStatus,
      admissionDate: '2024-01-14',
      parentId: 3,
    },
  ]

  // Use demo data if API fails or for presentation
  const displayBabies = babies.length > 0 ? babies : demoBabies

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

  const handleShiftUpdate = (babyId: number) => {
    router.push(`/nurse/shift-update/${babyId}`)
  }

  const handleViewDetails = (babyId: number) => {
    router.push(`/baby/${babyId}`)
  }

  return (
    <div className="min-h-screen bg-medical-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">NeoTrack</h1>
              <span className="ml-4 text-sm text-gray-600">Nurse Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/nurse/register')}
                className="btn-primary"
              >
                Register New Baby
              </button>
              <button
                onClick={() => router.push('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Admitted Babies</h2>
          <p className="text-gray-600 mt-1">Total: {displayBabies.length} babies</p>
        </div>

        {/* Baby Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayBabies.map((baby) => (
            <div key={baby.id} className="card hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{baby.name}</h3>
                  <p className="text-sm text-gray-600">ID: #{baby.id}</p>
                </div>
                <span className={getStatusColor(baby.status)}>
                  {baby.status}
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium">{baby.birthWeight} kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Gestational Age:</span>
                  <span className="font-medium">{baby.gestationalAge} weeks</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Gender:</span>
                  <span className="font-medium">{baby.gender}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Diagnosis:</span>
                  <p className="font-medium mt-1">{baby.diagnosis}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleShiftUpdate(baby.id)}
                  className="btn-primary flex-1 text-sm py-2"
                >
                  Log Shift Update
                </button>
                <button
                  onClick={() => handleViewDetails(baby.id)}
                  className="btn-secondary flex-1 text-sm py-2"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Stable</p>
                <p className="text-2xl font-bold text-gray-900">
                  {babies.filter(b => b.status === 'STABLE').length}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Critical</p>
                <p className="text-2xl font-bold text-gray-900">
                  {babies.filter(b => b.status === 'CRITICAL').length}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Improving</p>
                <p className="text-2xl font-bold text-gray-900">
                  {babies.filter(b => b.status === 'IMPROVING').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
