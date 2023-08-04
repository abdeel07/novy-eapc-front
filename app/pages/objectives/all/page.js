'use client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'


function AllObjectives() {

  const [page, setPage] = useState(0);

  const fetchObjectives = (page = 0) =>
  fetch('http://localhost:8080/api/objective/?page=' + page + '&size=2').then((res) => res.json());

  const {
      isLoading,
      isError,
      error,
      data,
      isFetching,
      isPreviousData,
    } = useQuery({
      queryKey: ['objectives', page],
      queryFn: () => fetchObjectives(page),
      keepPreviousData : true
    })
      console.log(data)
  return (
  <div>
    {isLoading ? (
      <div>Loading...</div>
    ) : isError ? (
      <div>Error: {error.message}</div>
    ) : (
      <div>
        {data.content.map(obj => (
          <p key={obj.id}>{obj.title} {obj.comment}</p>
          
        ))}
      </div>
    )}
    <span>Current Page: {data?.currentPage + 1}</span>
      <button onClick={() => setPage((old) => Math.max(old - 1, 0))} disabled={page === 0}>
        Previous Page
      </button>
      <button
        onClick={() => {
          if (!isPreviousData && data?.totalPages > data?.currentPage + 1) {
            setPage((old) => old + 1);
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPreviousData || data?.totalPages <= data?.currentPage + 1}
      >
        Next Page
      </button>
      {isFetching ? <span>Loading...</span> : null}
  </div>
  )
}

export default AllObjectives