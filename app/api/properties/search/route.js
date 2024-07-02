import connectDB from '@/config/database'
import Property from '@/models/Property'

export const dynamic = 'force-dynamic'

// GET /api/properties/search
export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)

    const location = searchParams.get('location')
    const propertyType = searchParams.get('propertyType')

    const locationPattern = new RegExp(location, 'i') // case-insensitive

    // Match location pattern agains database fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { 'location.street': locationPattern },
        { 'location.city': locationPattern },
        { 'location.state': locationPattern },
        { 'location.zipcode': locationPattern },
      ],
    }

    // Only check for property if it not 'All'
    if (propertyType && propertyType !== 'All') {
      const typePattern = new RegExp(propertyType, 'i') // case-insensitive
      query.type = typePattern
    }

    const properties = await Property.find(query)

    return new Response(JSON.stringify(properties), {
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
