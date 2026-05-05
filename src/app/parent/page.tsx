'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ParentForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    parentName: '',
    babyName: '',
    babyId: '',
    phone: '',
    weight: '',
    temperature: '',
    feedingAmount: '',
    breathing: 'normal',
    activity: 'normal',
    condition: 'stable',
    notes: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/parent-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'web-form'
        })
      })

      if (response.ok) {
        setSuccess('Report submitted successfully! Nurse will review and contact you if needed.')
        // Reset form
        setFormData({
          parentName: '',
          babyName: '',
          babyId: '',
          phone: '',
          weight: '',
          temperature: '',
          feedingAmount: '',
          breathing: 'normal',
          activity: 'normal',
          condition: 'stable',
          notes: ''
        })
      } else {
        setError('Failed to submit report. Please try again or call hospital directly.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'critical':
        return 'text-red-600 border-red-300'
      case 'concerning':
        return 'text-yellow-600 border-yellow-300'
      case 'stable':
        return 'text-green-600 border-green-300'
      default:
        return 'text-gray-600 border-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-medical-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">P</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Parent Baby Report</h1>
          <p className="text-lg text-gray-600">Report your baby's daily condition from home</p>
          <p className="text-sm text-gray-500 mt-2">
            For SMS reporting, send your baby's information to: <span className="font-semibold">+250 788 123 456</span>
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Parent Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+250 788 123 456"
                  required
                />
              </div>
            </div>

            {/* Baby Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Baby Name
                </label>
                <input
                  type="text"
                  name="babyName"
                  value={formData.babyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Baby's name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Baby ID (if known)
                </label>
                <input
                  type="text"
                  name="babyId"
                  value={formData.babyId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Hospital ID number"
                />
              </div>
            </div>

            {/* Vital Signs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="3.2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleInputChange}
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="36.8"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feeding Amount (ml)
                </label>
                <input
                  type="number"
                  name="feedingAmount"
                  value={formData.feedingAmount}
                  onChange={handleInputChange}
                  step="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="60"
                  required
                />
              </div>
            </div>

            {/* Condition Assessment */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Breathing
                </label>
                <select
                  name="breathing"
                  value={formData.breathing}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="normal">Normal</option>
                  <option value="rapid">Rapid</option>
                  <option value="difficult">Difficult</option>
                  <option value="irregular">Irregular</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Level
                </label>
                <select
                  name="activity"
                  value={formData.activity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="normal">Normal</option>
                  <option value="lethargic">Lethargic</option>
                  <option value="irritable">Irritable</option>
                  <option value="unusual">Unusual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Condition
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${getConditionColor(formData.condition)}`}
                  required
                >
                  <option value="stable">Stable - Baby seems fine</option>
                  <option value="concerning">Concerning - Need monitoring</option>
                  <option value="critical">Critical - Need immediate attention</option>
                </select>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any additional observations or concerns..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <p className="font-medium">Emergency? Call hospital directly:</p>
                <p>+250 788 999 999</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-medical-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Baby Report'}
              </button>
            </div>
          </form>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">How This Works</h2>
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <p>Fill in your baby's daily condition using this form</p>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-blue-600 font-semibold">2</span>
              </div>
              <p>Nurse receives your report immediately and analyzes against medical thresholds</p>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-blue-600 font-semibold">3</span>
              </div>
              <p>If concerning trends detected, nurse contacts you or escalates to doctor</p>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-blue-600 font-semibold">4</span>
              </div>
              <p>For rural areas without internet, send SMS to +250 788 123 456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
