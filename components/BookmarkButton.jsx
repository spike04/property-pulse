'use client'

import { FaBookmark } from 'react-icons/fa'

export default function BookmarkButton({ property }) {
  return (
    <button
      onClick={() => console.log(property._id)}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  )
}