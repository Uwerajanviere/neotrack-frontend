'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function ShiftUpdate() {
  const router = useRouter()
  const params = useParams()
  const babyId = params.babyId as string

  const [formData, setFormData] = useState({
    weight: '',
    temperature: '',
    feedingAmount: '',
    medications: '',
    notes: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const getTemperatureColor = (temp: string) => {
    const tempNum = parseFloat(temp)
    if (tempNum < 36.5) return 'border-red-500 bg-red-50'
    if (tempNum > 37.5) return 'border-yellow-500 bg-yellow-50'
    return 'border-gray-300'
  }

  const getWeightColor = (weight: string) => {
    const weightNum = parseFloat(weight)
    if (weightNum < 1.5) return 'border-red-500 bg-red-50'
    if (weightNum < 2.0) return 'border-yellow-500 bg-yellow-50'
    return 'border-gray-300'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      router.push('/nurse')
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
              <h1 className="text-xl font-bold text-gray-900">Shift Update - Baby #{babyId}</h1>
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
        {/* Alert Banner */}
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-sm text-yellow-800">
              Critical values will be highlighted in red. Temperature below 36.5°C requires immediate attention.
            </span>
          </div>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vital Signs */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Vital Signs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className={`input-field ${getWeightColor(formData.weight)}`}
                    placeholder="2.15"
                    required
                  />
                  {formData.weight && parseFloat(formData.weight) < 1.5 && (
                    <p className="text-red-600 text-sm mt-1">⚠️ Low weight - requires monitoring</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    className={`input-field ${getTemperatureColor(formData.temperature)}`}
                    placeholder="36.8"
                    required
                  />
                  {formData.temperature && parseFloat(formData.temperature) < 36.5 && (
                    <p className="text-red-600 text-sm mt-1">🚨 Critical: Temperature too low!</p>
                  )}
                  {formData.temperature && parseFloat(formData.temperature) > 37.5 && (
                    <p className="text-yellow-600 text-sm mt-1">⚠️ High temperature - monitor closely</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feeding Amount (ml)
                  </label>
                  <input
                    type="number"
                    name="feedingAmount"
                    value={formData.feedingAmount}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="45"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medications Given
                  </label>
                  <textarea
                    name="medications"
                    value={formData.medications}
                    onChange={handleChange}
                    rows={3}
                    className="input-field"
                    placeholder="List medications administered during this shift"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nurse Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="input-field"
                    placeholder="Observations, concerns, or any important notes about the baby's condition"
                  />
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
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Shift Update'}
              </button>
            </div>
          </form>
        </div>

        {/* Quick Reference */}
        <div className="mt-6 card">
          <h3 className="font-semibold text-gray-900 mb-3">Quick Reference - Normal Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Temperature:</span>
              <span className="text-green-600 ml-2">36.5°C - 37.5°C</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Weight Range:</span>
              <span className="text-green-600 ml-2">2.0kg - 4.5kg</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Feeding:</span>
              <span className="text-green-600 ml-2">30-60ml per feed</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
