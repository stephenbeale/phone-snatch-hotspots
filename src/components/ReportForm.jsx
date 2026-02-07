import { useState, useRef } from 'react'
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
  const [addressQuery, setAddressQuery] = useState('')
  const [addressResults, setAddressResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState('')
  const searchTimeout = useRef(null)

  const handleQuickLocation = (location) => {
    setSelectedLocation(location.name)
    setAddressQuery('')
    setAddressResults([])
    setFormData(prev => ({
      ...prev,
      lat: location.lat.toString(),
      lng: location.lng.toString(),
    }))
  }

  const handleAddressSearch = (query) => {
    setAddressQuery(query)
    setSearchError('')

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }

    if (query.length < 3) {
      setAddressResults([])
      return
    }

    searchTimeout.current = setTimeout(async () => {
      setIsSearching(true)
      try {
        const params = new URLSearchParams({
          q: query,
          format: 'json',
          addressdetails: '1',
          limit: '5',
          countrycodes: 'gb',
          viewbox: '-0.5103,51.2868,0.3340,51.6919',
          bounded: '1',
        })
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?${params}`,
          { headers: { 'Accept-Language': 'en' } }
        )
        const data = await response.json()
        setAddressResults(data)
        if (data.length === 0) {
          setSearchError('No results found. Try a different search.')
        }
      } catch {
        setSearchError('Search failed. Check your connection.')
      } finally {
        setIsSearching(false)
      }
    }, 400)
  }

  const handleAddressSelect = (result) => {
    setSelectedLocation(result.display_name.split(',')[0])
    setAddressQuery(result.display_name)
    setAddressResults([])
    setFormData(prev => ({
      ...prev,
      lat: result.lat,
      lng: result.lon,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.lat || !formData.lng) {
      alert('Please select a location or search for an address')
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

          {!pinnedLocation && (
            <>
              <div className="form-group">
                <label htmlFor="address">Search Address</label>
                <div className="address-search-wrapper">
                  <input
                    type="text"
                    id="address"
                    value={addressQuery}
                    onChange={(e) => handleAddressSearch(e.target.value)}
                    placeholder="e.g., Oxford Circus, London SW1..."
                    autoComplete="off"
                  />
                  {isSearching && <span className="search-spinner" />}
                </div>
                {searchError && <p className="search-error">{searchError}</p>}
                {addressResults.length > 0 && (
                  <ul className="address-results">
                    {addressResults.map(result => (
                      <li key={result.place_id}>
                        <button type="button" onClick={() => handleAddressSelect(result)}>
                          {result.display_name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="form-section">
                <label>Or quick select:</label>
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
            </>
          )}

          {selectedLocation && (
            <div className="selected-location-label">
              Selected: {selectedLocation}
            </div>
          )}

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
