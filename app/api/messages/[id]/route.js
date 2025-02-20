import connectDB from '@/config/database'
import Message from '@/models/Message'
import { getSessionUser } from '@/utils/getSessionUser'

export const dynamic = 'force-dynamic'

// PUT /api/messages/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB()

    const { id } = params
    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User Id is required', {
        status: 401,
      })
    }

    const { userId } = sessionUser

    const message = await Message.findById(id)
    if (!message) {
      return new Response(JSON.stringify({ message: 'Message not found' }), {
        status: 404,
      })
    }

    // Verify Ownership
    if (message.recipient.toString() !== userId) {
      return new Response('UnAuthorized', {
        status: 401,
      })
    }

    // Update message to read / unread depending on the current state
    message.read = !message.read
    await message.save()

    return new Response(JSON.stringify(message), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response('Something went wrong', {
      status: 500,
    })
  }
}

// DELETE /api/messages/:id
export const DELETE = async (request, { params }) => {
  try {
    await connectDB()

    const { id } = params

    console.log(id)

    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User Id is required', {
        status: 401,
      })
    }

    const { userId } = sessionUser

    const message = await Message.findById(id)
    if (!message) {
      return new Response(JSON.stringify({ message: 'Message not found' }), {
        status: 404,
      })
    }

    // Verify Ownership
    if (message.recipient.toString() !== userId) {
      return new Response('UnAuthorized', {
        status: 401,
      })
    }

    await message.deleteOne()

    return new Response(JSON.stringify({ message: 'Message deleted' }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response('Something went wrong', {
      status: 500,
    })
  }
}
