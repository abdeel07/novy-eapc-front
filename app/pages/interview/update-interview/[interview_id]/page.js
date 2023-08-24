'use client'
import React from 'react'
import { Grid, CircularProgress } from '@mui/material'; // Import CircularProgress along with Grid
import FormInterview from '@/app/components/forms/interview/update'
import { getRequest } from "@/app/utils/api";

import { useQuery } from "@tanstack/react-query";

const UpdateInterview = ({ params }) => {
  
  
  // Parse the interview_id parameter to an integer
  const id = parseInt(params.interview_id);
  console.log(id);
  // Use the useQuery hook with correct syntax
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
  useQuery({
    queryKey: ["interviews", id],
    queryFn: () => getRequest("interview/"+id),
    keepPreviousData: true,
  });
  console.log(data)
  if (isLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <CircularProgress size={70} style={{ color: "rgb(255, 6, 126)" }} />
      </Grid>
    );
  }
  if (isError) {
    return <div>Error! {error.message}</div>
}

  return (
    <div>
      <FormInterview interview={data} />
    </div>
  );
}

export default UpdateInterview;
