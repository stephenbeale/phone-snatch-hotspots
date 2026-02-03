import { useState, useEffect } from 'react'
import HeatMap from './components/HeatMap'
import ReportForm from './components/ReportForm'
import LocationChoice from './components/LocationChoice'
import PinConfirm from './components/PinConfirm'
import './App.css'

function App() {
  const [incidents, setIncidents] = useState(() => {
    const saved = localStorage.getItem('phoneSnatchIncidents')
    return saved ? JSON.parse(saved) : []
  })
  const [showChoice, setShowChoice] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [isPinningMode, setIsPinningMode] = useState(false)
  const [pinnedLocation, setPinnedLocation] = useState(null)
  const [showPinConfirm, setShowPinConfirm] = useState(false)
  const [tempPinLocation, setTempPinLocation] = useState(null)

  useEffect(() => {
    localStorage.setItem('phoneSnatchIncidents', JSON.stringify(incidents))
  }, [incidents])

  const resetState = () => {
    setShowChoice(false)
    setShowForm(false)
    setIsPinningMode(false)
    setPinnedLocation(null)
    setShowPinConfirm(false)
    setTempPinLocation(null)
  }

  const handleReport = (newIncident) => {
    setIncidents(prev => [...prev, { ...newIncident, intensity: 0.8 }])
    resetState()
  }

  const handleChoosePin = () => {
    setShowChoice(false)
    setIsPinningMode(true)
  }

  const handleChooseAddress = () => {
    setShowChoice(false)
    setShowForm(true)
  }

  const handleMapClick = (latlng) => {
    if (isPinningMode) {
      setTempPinLocation(latlng)
      setShowPinConfirm(true)
    }
  }

  const handlePinConfirm = () => {
    setPinnedLocation(tempPinLocation)
    setShowPinConfirm(false)
    setIsPinningMode(false)
    setShowForm(true)
  }

  const handlePinCancel = () => {
    setTempPinLocation(null)
    setShowPinConfirm(false)
    // Stay in pinning mode so user can try again
  }

  const totalReports = incidents.length

  return (
    <div className="app">
      <header className="header">
        <h1>Phone Snatch Hotspots</h1>
        <p className="subtitle">London Phone Theft Heat Map</p>
        <div className="stats">
          <span className="stat-badge">{totalReports} incidents reported</span>
        </div>
      </header>

      <main className="main">
        <div className="map-container">
          <HeatMap
            incidents={incidents}
            onMapClick={handleMapClick}
            selectedLocation={tempPinLocation || pinnedLocation}
            isPinningMode={isPinningMode}
          />
        </div>

        {isPinningMode && (
          <div className="pinning-hint">
            Click on the map to drop a pin at the incident location
            <button className="pinning-cancel" onClick={resetState}>Cancel</button>
          </div>
        )}

        {!isPinningMode && !showChoice && !showForm && (
          <div className="controls">
            <button
              className="report-btn"
              onClick={() => setShowChoice(true)}
            >
              Report Incident
            </button>
          </div>
        )}

        {showChoice && (
          <LocationChoice
            onChoosePin={handleChoosePin}
            onChooseAddress={handleChooseAddress}
            onCancel={resetState}
          />
        )}

        {showPinConfirm && tempPinLocation && (
          <PinConfirm
            location={tempPinLocation}
            onConfirm={handlePinConfirm}
            onCancel={handlePinCancel}
          />
        )}

        {showForm && (
          <ReportForm
            onSubmit={handleReport}
            onCancel={resetState}
            pinnedLocation={pinnedLocation}
          />
        )}
      </main>

      <footer className="footer">
        <p>Help keep London safe. Report phone snatching incidents to warn others.</p>
      </footer>
    </div>
  )
}

export default App
