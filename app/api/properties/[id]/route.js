import connectDB from '@/config/database'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'

export const dynamic = 'force-dynamic'

// GET /api/properties/:id
export async function GET(request, { params }) {
  try {
    await connectDB()

    const property = await Property.findById(params.id)

    if (!property) return new Response('Property not found', { status: 404 })

    return new Response(JSON.stringify(property), {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new Response('Something went wrong', { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const propertyId = params.id
    const sessionUser = await getSessionUser()

    // Check for session
    if (!sessionUser || !sessionUser.userId)
      return new Response('User ID is required', { status: 401 })

    const { userId } = sessionUser

    await connectDB()

    const property = await Property.findById(propertyId)

    if (!property) return new Response('Property not found', { status: 404 })

    // Verify Ownership
    if (property.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 })
    }

    await property.deleteOne()

    return new Response('Property deleted', { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response('Something went wrong', { status: 500 })
  }
}

// PUT /api/properties/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB()

    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.userId) {
      return new Response('Unauthorized', { status: 401 })
    }

    const id = params.id
    const { userId } = sessionUser

    const formData = await request.formData()

    // Access all values from amenities and images
    var amenities = formData.getAll('amenities')

    // Get Property to update
    const existingProperty = await Property.findById(id)

    if (!existingProperty) {
      return new Response('Property does not exists', { status: 404 })
    }

    // Verify Ownership
    if (existingProperty.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 })
    }

    // Create propertyData object for database
    const propertyData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
        nightly: formData.get('rates.nightly'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: sessionUser.userId,
    }

    // Update Property in Database
    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData)

    return new Response(JSON.stringify(updatedProperty), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response('Failed to add Property', { status: 500 })
  }
}
