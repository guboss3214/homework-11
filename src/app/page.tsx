import { Container, Typography, Stack, Box } from "@mui/material";
import Post from "@/components/Post";
import Pagination from "@/components/Paginaton";
import NewPostNotification from "@/notification/NewPostNotification";


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

  return { data: slicedPosts, totalPages };
}

export default async function Page({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) {
  const resolvedParams = await searchParams;
  const currentPage = parseInt(resolvedParams.page || "1");
  const { data, totalPages } = await getPosts(currentPage);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <NewPostNotification />
      <Typography variant="h4" align="center" fontWeight={800} sx={{ mb: 5 }}>
        Community Feed
      </Typography>
      
      <Stack spacing={4} alignItems="center">
        {data.map((post: any) => (
          <Post key={post.id} post={post} />
        ))}
      </Stack>
      
      <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={totalPages} 
          page={currentPage} 
        />
      </Box>
    </Container>
  );
}