import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header";
import { Providers } from "@/components/Providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body suppressHydrationWarning={true}>
        <Providers>
          <AuthProvider>
            <Header />
            <main>{children}</main>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}