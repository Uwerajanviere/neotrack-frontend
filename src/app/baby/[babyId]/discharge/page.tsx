'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { DischargeChecklist } from '../../../../types'

export default function DischargeChecklistPage() {
  const router = useRouter()
  const params = useParams()
  const babyId = params.babyId as string

  const [checklist, setChecklist] = useState<DischargeChecklist>({
    id: 1,
    babyId: parseInt(babyId),
    stableTemperature: false,
    feedingWell: false,
    weightGain: false,
    noInfectionSigns: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCheckboxChange = (field: keyof DischargeChecklist) => {
    setChecklist(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const completedCount = Object.values(checklist).filter(value => 
    typeof value === 'boolean' && value === true
  ).length

  const totalCount = 4
  const isReadyForDischarge = completedCount === totalCount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isReadyForDischarge) {
      alert('Please complete all checklist items before submitting.')
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      alert('Baby marked as ready for discharge!')
      router.push('/baby/' + babyId)
    }, 1500)
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
              <h1 className="text-xl font-bold text-gray-900">Discharge Checklist - Baby #{babyId}</h1>
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
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-900">WHO Discharge Standards</h2>
            <span className="text-sm font-medium text-gray-600">
              {completedCount}/{totalCount} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Discharge Status */}
        {isReadyForDischarge && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-green-800 font-medium">Ready for Discharge</span>
            </div>
          </div>
        )}

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Checklist Items */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Requirements</h3>
              <div className="space-y-4">
                <div className="flex items-start p-4 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    id="stableTemperature"
                    checked={checklist.stableTemperature}
                    onChange={() => handleCheckboxChange('stableTemperature')}
                    className="mt-1 w-5 h-5 text-medical-blue border-gray-300 rounded focus:ring-medical-blue"
                  />
                  <div className="ml-4">
                    <label htmlFor="stableTemperature" className="font-medium text-gray-900 cursor-pointer">
                      Stable Temperature
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      Baby maintains normal body temperature (36.5°C - 37.5°C) without external heating for at least 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    id="feedingWell"
                    checked={checklist.feedingWell}
                    onChange={() => handleCheckboxChange('feedingWell')}
                    className="mt-1 w-5 h-5 text-medical-blue border-gray-300 rounded focus:ring-medical-blue"
                  />
                  <div className="ml-4">
                    <label htmlFor="feedingWell" className="font-medium text-gray-900 cursor-pointer">
                      Feeding Well
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      Baby can feed adequately (breastfeeding or bottle) and is gaining weight appropriately
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    id="weightGain"
                    checked={checklist.weightGain}
                    onChange={() => handleCheckboxChange('weightGain')}
                    className="mt-1 w-5 h-5 text-medical-blue border-gray-300 rounded focus:ring-medical-blue"
                  />
                  <div className="ml-4">
                    <label htmlFor="weightGain" className="font-medium text-gray-900 cursor-pointer">
                      Weight Gain
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      Baby has regained birth weight and shows consistent weight gain (15-20g/kg/day)
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    id="noInfectionSigns"
                    checked={checklist.noInfectionSigns}
                    onChange={() => handleCheckboxChange('noInfectionSigns')}
                    className="mt-1 w-5 h-5 text-medical-blue border-gray-300 rounded focus:ring-medical-blue"
                  />
                  <div className="ml-4">
                    <label htmlFor="noInfectionSigns" className="font-medium text-gray-900 cursor-pointer">
                      No Infection Signs
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      Baby shows no signs of infection, no antibiotics for at least 48 hours, and normal vital signs
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Requirements */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Parent Requirements</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Parent Education Completed</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Baby care and hygiene training</li>
                    <li>• Breastfeeding support and guidance</li>
                    <li>• Danger signs recognition</li>
                    <li>• Follow-up appointment scheduled</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">Home Environment</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Clean and safe home environment verified</li>
                    <li>• Transportation arranged for follow-up visits</li>
                    <li>• Emergency contact information confirmed</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isReadyForDischarge || isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Mark Ready for Discharge'}
              </button>
            </div>
          </form>
        </div>

        {/* Important Notes */}
        <div className="mt-6 card">
          <h3 className="font-semibold text-gray-900 mb-3">Important Notes</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• All checklist items must be completed before discharge</li>
            <li>• Final approval must be given by the attending physician</li>
            <li>• Discharge summary and instructions must be provided to parents</li>
            <li>• First follow-up appointment should be scheduled within 48-72 hours</li>
            <li>• Emergency contact information must be verified</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
