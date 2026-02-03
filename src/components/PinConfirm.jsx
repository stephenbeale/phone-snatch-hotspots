import './PinConfirm.css'

function PinConfirm({ location, onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay">
      <div className="confirm-card">
        <h3>Confirm Location</h3>
        <p className="confirm-coords">
          {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
        </p>
        <p className="confirm-hint">Is this the correct location?</p>
        <div className="confirm-actions">
          <button className="confirm-btn cancel" onClick={onCancel}>
            Try Again
          </button>
          <button className="confirm-btn confirm" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default PinConfirm
