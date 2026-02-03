import './LocationChoice.css'

function LocationChoice({ onChoosePin, onChooseAddress, onCancel }) {
  return (
    <div className="choice-overlay">
      <div className="choice-card">
        <h2>Report an Incident</h2>
        <p className="choice-subtitle">How would you like to specify the location?</p>

        <div className="choice-options">
          <button className="choice-btn pin-btn" onClick={onChoosePin}>
            <span className="choice-icon">📍</span>
            <span className="choice-label">Pin on Map</span>
            <span className="choice-desc">Click to place a marker on the exact location</span>
          </button>

          <button className="choice-btn address-btn" onClick={onChooseAddress}>
            <span className="choice-icon">🏠</span>
            <span className="choice-label">Enter Address</span>
            <span className="choice-desc">Type a street address or postcode</span>
          </button>
        </div>

        <button className="choice-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default LocationChoice
