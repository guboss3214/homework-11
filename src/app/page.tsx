import ProtectedRoute from "@/components/ProtectedRoute";
import StripePageClient from "@/components/StripePageClient";
import { Container, Typography } from "@mui/material";

async function getPosts(page: number) {
  const res = await fetch("https://playground.zenberry.one/api/exhibits", { 
    cache: "no-store" 
  });
  
  if (!res.ok) return { data: [], totalPages: 1 };

  const response = await res.json();

  const allPosts = Array.isArray(response.data) ? response.data : [];
  const postsPerPage = 4;
  
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  
  const startIndex = (page - 1) * postsPerPage;
  const slicedPosts = allPosts.slice(startIndex, startIndex + postsPerPage);

  return { 
    data: slicedPosts, 
    totalPages 
  };
}

export default async function Page({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = parseInt(searchParams.page || "1");
  const { data, totalPages } = await getPosts(currentPage);

  return (
    <ProtectedRoute>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" fontWeight={800} sx={{ mb: 5 }}>
          Community Feed (SSR)
        </Typography>
        
        <StripePageClient 
          initialPosts={data} 
          totalPages={totalPages} 
          currentPage={currentPage}
        />
      </Container>
    </ProtectedRoute>
  );
}