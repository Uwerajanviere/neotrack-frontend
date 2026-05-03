'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Baby, BabyStatus, ShiftLog } from '@/types'

// Mock data - replace with API calls
const mockBaby: Baby = {
  id: 1,
  name: 'Baby Jean',
  gender: 'Male',
  birthWeight: 2.1,
  gestationalAge: 34,
  diagnosis: 'Premature birth',
  status: 'STABLE',
  admissionDate: '2024-01-15',
  parentId: 1,
  parent: {
    id: 1,
    name: 'Marie Mukamana',
    phoneNumber: '+250 788 123 456',
    language: 'Kinyarwanda'
  }
}

const mockShiftLogs: ShiftLog[] = [
  {
    id: 1,
    babyId: 1,
    nurseId: 1,
    weight: 2.15,
    temperature: 36.8,
    feedingAmount: 45,
    medications: 'Vitamin K',
    notes: 'Baby feeding well, active and alert',
    createdAt: '2024-01-17T08:00:00Z',
    nurse: { id: 1, name: 'Nurse Claire', email: 'claire@hospital.com', role: 'NURSE', createdAt: '2024-01-01' }
  },
  {
    id: 2,
    babyId: 1,
    nurseId: 2,
    weight: 2.12,
    temperature: 36.6,
    feedingAmount: 40,
    medications: 'None',
    notes: 'Slightly less feeding but still within normal range',
    createdAt: '2024-01-16T20:00:00Z',
    nurse: { id: 2, name: 'Nurse Jean', email: 'jean@hospital.com', role: 'NURSE', createdAt: '2024-01-01' }
  }
]

export default function BabyDetail() {
  const router = useRouter()
  const params = useParams()
  const babyId = params.babyId as string
  const [baby] = useState<Baby>(mockBaby)
  const [shiftLogs] = useState<ShiftLog[]>(mockShiftLogs)

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

  return (
    <div className="min-h-screen bg-medical-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
              <h1 className="text-xl font-bold text-gray-900">{baby.name} - Details</h1>
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
        {/* Baby Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Baby Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{baby.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Baby ID</p>
                  <p className="font-medium">#{baby.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="font-medium">{baby.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={getStatusColor(baby.status)}>
                    {baby.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Birth Weight</p>
                  <p className="font-medium">{baby.birthWeight} kg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gestational Age</p>
                  <p className="font-medium">{baby.gestationalAge} weeks</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Admission Date</p>
                  <p className="font-medium">{new Date(baby.admissionDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Diagnosis</p>
                  <p className="font-medium">{baby.diagnosis}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Parent Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Mother's Name</p>
                  <p className="font-medium">{baby.parent?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone Number</p>
                  <p className="font-medium">{baby.parent?.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Preferred Language</p>
                  <p className="font-medium">{baby.parent?.language}</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">SMS Preview</h4>
                <p className="text-sm text-blue-800">
                  "Your baby {baby.name.toLowerCase()} is {baby.status.toLowerCase()} today. Current weight: {shiftLogs[0]?.weight || baby.birthWeight}kg. Temperature: {shiftLogs[0]?.temperature || '36.8'}°C."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight Progress</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-gray-500">Weight Chart</p>
                <div className="mt-4 space-y-2 text-sm">
                  {shiftLogs.slice(0, 5).reverse().map((log, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{new Date(log.createdAt).toLocaleDateString()}:</span>
                      <span className="font-medium">{log.weight}kg</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Temperature Trend</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-gray-500">Temperature Chart</p>
                <div className="mt-4 space-y-2 text-sm">
                  {shiftLogs.slice(0, 5).reverse().map((log, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{new Date(log.createdAt).toLocaleDateString()}:</span>
                      <span className={`font-medium ${log.temperature < 36.5 ? 'text-red-600' : 'text-gray-900'}`}>
                        {log.temperature}°C
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical History Timeline */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical History Timeline</h3>
          <div className="space-y-4">
            {shiftLogs.map((log) => (
              <div key={log.id} className="border-l-4 border-blue-400 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">
                      {new Date(log.createdAt).toLocaleDateString()} - {new Date(log.createdAt).toLocaleTimeString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Nurse: {log.nurse?.name}</p>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Weight:</span>
                        <span className="ml-2 font-medium">{log.weight}kg</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Temperature:</span>
                        <span className={`ml-2 font-medium ${log.temperature < 36.5 ? 'text-red-600' : 'text-gray-900'}`}>
                          {log.temperature}°C
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Feeding:</span>
                        <span className="ml-2 font-medium">{log.feedingAmount}ml</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Medications:</span>
                        <span className="ml-2 font-medium">{log.medications || 'None'}</span>
                      </div>
                    </div>
                    {log.notes && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                        <span className="text-gray-600">Notes:</span>
                        <p className="mt-1 text-gray-900">{log.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
