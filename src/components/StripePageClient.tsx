"use client";

import { Box, Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import Post from "./Post";
import Pagination from "./Paginaton";

export default function StripePageClient({ 
  initialPosts, 
  totalPages, 
  currentPage 
}: { 
  initialPosts: any[], 
  totalPages: number, 
  currentPage: number 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", value.toString());

    router.push(`/?${params.toString()}`);
  };

  return (
    <>
      <Stack spacing={4} alignItems="center">
        {initialPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Stack>
      
      <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={totalPages} 
          page={currentPage} 
          onChange={handlePageChange} 
        />
      </Box>
    </>
  );
}