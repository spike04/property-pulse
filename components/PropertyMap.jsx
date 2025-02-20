'use client'

import 'mapbox-gl/dist/mapbox-gl.css'
import Map, { Marker } from 'react-map-gl'
import { setDefaults, fromAddress } from 'react-geocode'
import Spinner from './Spinner'
import Image from 'next/image'
import pin from '@/assets/images/pin.svg'
import { useEffect, useState } from 'react'

export default function PropertyMap({ property }) {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px',
  })
  const [loading, setLoading] = useState(true)
  const [geocodeError, setGeocodeError] = useState(false)

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: 'en',
    region: 'us',
  })

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street}, ${property.location.city}, ${property.location.state} ${property.location.zipcode}`,
        )

        // Check for results
        if (res.results.length === 0) {
          // No Results found
          setGeocodeError(true)
          setLoading(false)
          return
        }

        const { lat, lng } = res.results[0].geometry.location

        setLat(lat)
        setLng(lng)
        setViewport({ ...viewport, latitude: lat, longitude: lng })
        setLoading(false)
      } catch (error) {
        console.error(error)
        setGeocodeError(true)
        setLoading(false)
      }
    }

    fetchCoords()
  }, [])

  if (loading) return <Spinner />

  // Handle case where geocoding fails
  if (geocodeError) {
    return <div className="text-xl">No Location Data found</div>
  }

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import('mapbox-gl')}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 15,
        }}
        style={{ width: '100%', height: '500px' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker latitude={lat} longitude={lng} anchor="bottom">
          <Image src={pin} alt="pin" width={40} height={40} />
        </Marker>
      </Map>
    )
  )
}
