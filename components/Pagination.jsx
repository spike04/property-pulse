export default function Pagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / pageSize)

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        onClick={() => onPageChange(page - 1)}
        className="mr-2 px-2 py-1 border border-gray-300 rounded disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
        disabled={page === 1}
      >
        Previous
      </button>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        className="ml-2 px-2 py-1 border border-gray-300 rounded disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
        disabled={page === totalPages}
      >
        Next
      </button>
    </section>
  )
}
