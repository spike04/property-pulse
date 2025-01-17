import connectDB from '@/config/database'
import Property from '@/models/Property'

export const dynamic = 'force-dynamic'

// GET /api/properties/featured
export const GET = async (request) => {
  try {
    await connectDB()

    const properties = await Property.find({ is_featured: true })

    return new Response(JSON.stringify(properties), {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), {
      status: 500,
    })
  }
}
