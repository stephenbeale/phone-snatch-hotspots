import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.heat'
import './HeatMap.css'

// London center coordinates
const LONDON_CENTER = [51.5074, -0.1278]
const DEFAULT_ZOOM = 12

function HeatLayer({ incidents }) {
  const map = useMap()
  const heatLayerRef = useRef(null)

  useEffect(() => {
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current)
    }

    const heatData = incidents.map(incident => [
      incident.lat,
      incident.lng,
      incident.intensity || 0.5
    ])

    heatLayerRef.current = L.heatLayer(heatData, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      max: 1.0,
      gradient: {
        0.0: '#0000ff',
        0.25: '#00ffff',
        0.5: '#00ff00',
        0.75: '#ffff00',
        1.0: '#ff0000'
      }
    }).addTo(map)

    return () => {
      if (heatLayerRef.current) {
        map.removeLayer(heatLayerRef.current)
      }
    }
  }, [map, incidents])

  return null
}

function HeatMap({ incidents, onMapClick }) {
  return (
    <MapContainer
      center={LONDON_CENTER}
      zoom={DEFAULT_ZOOM}
      className="heat-map"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <HeatLayer incidents={incidents} />
    </MapContainer>
  )
}

export default HeatMap
