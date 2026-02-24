'use client'

import { Pagination as MuiPagination } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ count, page }: { count: number, page: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", value.toString());
    
    router.push(`/?${params.toString()}`);
  };

  return (
    <MuiPagination 
      count={count} 
      page={page} 
      onChange={handlePageChange} 
      color="primary" 
      variant="outlined" 
      shape="rounded" 
    />
  );
}