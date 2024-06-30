const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null

export async function fetchProperties() {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return []
    }

    const response = await fetch(`${apiDomain}/properties`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch properties')
    }
    return response.json()
  } catch (error) {
    console.log(error)
    return []
  }
}

// Fetch a single property by ID
export async function fetchProperty(id) {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return null
    }

    const response = await fetch(`${apiDomain}/properties/${id}`)

    if (!response.ok) {
      throw new Error('Failed to fetch property')
    }
    return response.json()
  } catch (error) {
    console.log(error)
    return null
  }
}
