import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header";
import { Providers } from "@/components/Providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body suppressHydrationWarning={true}>
        <AppRouterCacheProvider>
          <Providers>
            <AuthProvider>
              <Header />
              <main>{children}</main>
            </AuthProvider>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}