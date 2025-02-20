'use client'

import PropertyCard from '@/components/PropertyCard'
import Spinner from '@/components/Spinner'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function SavedPropertiesPage() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/bookmarks')

        if (res.status === 200) {
          const data = await res.json()
          setProperties(data)
        } else {
          console.log(res.statusText)
          toast.error('Failed to fetch saved properties')
        }
      } catch (error) {
        console.log(error)
        toast.error('Failed to fetch saved properties')
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {properties.length === 0 ? (
          <p>No Saved Properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
