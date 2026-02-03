import { useState } from 'react'
import './ReportForm.css'

// Common London locations for quick selection
const QUICK_LOCATIONS = [
  { name: 'Oxford Street', lat: 51.5155, lng: -0.1419 },
  { name: 'Covent Garden', lat: 51.5113, lng: -0.1223 },
  { name: 'Camden Town', lat: 51.5406, lng: -0.1426 },
  { name: 'King\'s Cross', lat: 51.5309, lng: -0.1233 },
  { name: 'Liverpool Street', lat: 51.5178, lng: -0.0823 },
  { name: 'Waterloo', lat: 51.5033, lng: -0.1195 },
  { name: 'Victoria', lat: 51.4952, lng: -0.1439 },
  { name: 'Shoreditch', lat: 51.5236, lng: -0.0771 },
]

function ReportForm({ onSubmit, onCancel, pinnedLocation }) {
  const [formData, setFormData] = useState({
    lat: pinnedLocation?.lat?.toString() || '',
    lng: pinnedLocation?.lng?.toString() || '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
  })
  const [selectedLocation, setSelectedLocation] = useState(pinnedLocation ? 'Map Pin' : '')

  const handleQuickLocation = (location) => {
    setSelectedLocation(location.name)
    setFormData(prev => ({
      ...prev,
      lat: location.lat.toString(),
      lng: location.lng.toString(),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.lat || !formData.lng) {
      alert('Please select a location or enter coordinates')
      return
    }

    onSubmit({
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng),
      description: formData.description,
      date: formData.date,
      time: formData.time,
      reportedAt: new Date().toISOString(),
    })
  }

  return (
    <div className="form-overlay">
      <div className="report-form">
        <h2>Report Phone Snatching</h2>
        <p className="form-subtitle">Help others stay safe by reporting incidents</p>

        <form onSubmit={handleSubmit}>
          {pinnedLocation && (
            <div className="pinned-location-notice">
              Location selected from map: {pinnedLocation.lat.toFixed(4)}, {pinnedLocation.lng.toFixed(4)}
            </div>
          )}

          <div className="form-section">
            <label>Quick Location Select:</label>
            <div className="quick-locations">
              {QUICK_LOCATIONS.map(loc => (
                <button
                  key={loc.name}
                  type="button"
                  className={`quick-loc-btn ${selectedLocation === loc.name ? 'selected' : ''}`}
                  onClick={() => handleQuickLocation(loc)}
                >
                  {loc.name}
                </button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="lat">Latitude</label>
              <input
                type="number"
                id="lat"
                step="any"
                value={formData.lat}
                onChange={(e) => setFormData(prev => ({ ...prev, lat: e.target.value }))}
                placeholder="e.g., 51.5074"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lng">Longitude</label>
              <input
                type="number"
                id="lng"
                step="any"
                value={formData.lng}
                onChange={(e) => setFormData(prev => ({ ...prev, lng: e.target.value }))}
                placeholder="e.g., -0.1278"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time (optional)</label>
              <input
                type="time"
                id="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description (optional)</label>
            <textarea
              id="description"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="e.g., Cyclist grabbed phone from hand near tube station..."
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReportForm
