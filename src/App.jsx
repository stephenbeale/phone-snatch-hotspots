import { useState, useEffect } from 'react'
import HeatMap from './components/HeatMap'
import ReportForm from './components/ReportForm'
import './App.css'

// Initial sample data for London phone snatch incidents
const INITIAL_INCIDENTS = [
  { lat: 51.5074, lng: -0.1278, intensity: 0.8 }, // Central London
  { lat: 51.5155, lng: -0.1419, intensity: 0.9 }, // Oxford Street
  { lat: 51.5113, lng: -0.1223, intensity: 0.7 }, // Covent Garden
  { lat: 51.5033, lng: -0.1195, intensity: 0.6 }, // Waterloo
  { lat: 51.5194, lng: -0.1270, intensity: 0.8 }, // Euston
  { lat: 51.5007, lng: -0.1246, intensity: 0.5 }, // Westminster
  { lat: 51.5136, lng: -0.0895, intensity: 0.7 }, // Liverpool Street
  { lat: 51.5081, lng: -0.0759, intensity: 0.6 }, // Tower Hill
  { lat: 51.4652, lng: -0.1147, intensity: 0.4 }, // Brixton
  { lat: 51.5406, lng: -0.1426, intensity: 0.5 }, // Camden
  { lat: 51.5229, lng: -0.1545, intensity: 0.6 }, // King's Cross
  { lat: 51.5118, lng: -0.0600, intensity: 0.4 }, // Canary Wharf area
  { lat: 51.4613, lng: -0.3037, intensity: 0.3 }, // Richmond
  { lat: 51.5375, lng: -0.0057, intensity: 0.5 }, // Stratford
]

function App() {
  const [incidents, setIncidents] = useState(() => {
    const saved = localStorage.getItem('phoneSnatchIncidents')
    return saved ? JSON.parse(saved) : INITIAL_INCIDENTS
  })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    localStorage.setItem('phoneSnatchIncidents', JSON.stringify(incidents))
  }, [incidents])

  const handleReport = (newIncident) => {
    setIncidents(prev => [...prev, { ...newIncident, intensity: 0.8 }])
    setShowForm(false)
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
          <HeatMap incidents={incidents} onMapClick={(latlng) => {
            setShowForm(true)
          }} />
        </div>

        <div className="controls">
          <button
            className="report-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Report Incident'}
          </button>
        </div>

        {showForm && (
          <ReportForm
            onSubmit={handleReport}
            onCancel={() => setShowForm(false)}
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
