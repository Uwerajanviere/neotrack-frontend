'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Baby, BabyStatus } from '../../types'

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

// Mock statistics
const mockStats = {
  totalBabies: 45,
  activeCases: 32,
  dischargedCases: 13,
  dailyAdmissions: [3, 5, 2, 4, 6, 3, 4],
  outcomes: {
    recovered: 38,
    transferred: 5,
    deceased: 2
  }
}

export default function AdminDashboard() {
  const router = useRouter()
  const [babies] = useState<Baby[]>(mockBabies)
  const [stats] = useState(mockStats)

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
              <h1 className="text-xl font-bold text-gray-900">NeoTrack</h1>
              <span className="ml-4 text-sm text-gray-600">Admin Dashboard</span>
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
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Babies</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBabies}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Cases</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeCases}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Discharged</p>
                <p className="text-2xl font-bold text-gray-900">{stats.dischargedCases}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Avg Stay</p>
                <p className="text-2xl font-bold text-gray-900">12 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Admissions (Last 7 Days)</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-gray-500">Daily Admissions Chart</p>
                <div className="mt-4 grid grid-cols-7 gap-2 text-sm">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={index} className="text-center">
                      <p className="text-gray-600">{day}</p>
                      <p className="font-medium mt-1">{stats.dailyAdmissions[index]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Outcomes</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                <p className="text-gray-500">Outcomes Distribution</p>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-green-600">Recovered</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-4 mr-2">
                        <div className="bg-green-500 h-4 rounded-full" style={{width: '84%'}}></div>
                      </div>
                      <span className="font-medium">{stats.outcomes.recovered}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600">Transferred</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-4 mr-2">
                        <div className="bg-blue-500 h-4 rounded-full" style={{width: '11%'}}></div>
                      </div>
                      <span className="font-medium">{stats.outcomes.transferred}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-red-600">Deceased</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-4 mr-2">
                        <div className="bg-red-500 h-4 rounded-full" style={{width: '5%'}}></div>
                      </div>
                      <span className="font-medium">{stats.outcomes.deceased}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Babies Table */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Admissions</h2>
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
                    Days in NICU
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {babies.map((baby) => {
                  const daysInNICU = Math.floor((new Date().getTime() - new Date(baby.admissionDate).getTime()) / (1000 * 60 * 60 * 24))
                  return (
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {daysInNICU}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => router.push('/nurse/register')}
            className="card p-6 text-left hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Register New Baby</h3>
            <p className="text-sm text-gray-600 mt-1">Add a new admission to the NICU</p>
          </button>

          <button className="card p-6 text-left hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v1a1 1 0 001 1h4a1 1 0 001-1v-1m3-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v6m6 0v4m0 0h.01" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Manage Staff</h3>
            <p className="text-sm text-gray-600 mt-1">Add or remove medical staff</p>
          </button>

          <button className="card p-6 text-left hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v1a1 1 0 001 1h4a1 1 0 001-1v-1m3-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v6m6 0v4m0 0h.01" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Generate Reports</h3>
            <p className="text-sm text-gray-600 mt-1">Export monthly statistics</p>
          </button>
        </div>
      </main>
    </div>
  )
}
