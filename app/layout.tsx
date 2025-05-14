import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zafago - Digital Game Store",
  description: "Buy digital games, software, and more at Zafago.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
    // Script to scroll to top on page navigation
    if (typeof window !== 'undefined') {
      // Set scroll restoration to manual
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      
      // Scroll to top on initial load
      window.addEventListener('load', function() {
        window.scrollTo(0, 0);
      });
      
      // Create a more reliable navigation observer
      let lastPathname = window.location.pathname;
      
      // Use MutationObserver to detect DOM changes that might indicate navigation
      const observer = new MutationObserver(() => {
        if (lastPathname !== window.location.pathname) {
          lastPathname = window.location.pathname;
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      });
      
      // Start observing the document
      observer.observe(document.documentElement, { 
        childList: true, 
        subtree: true 
      });
      
      // Also listen for the Next.js route change events
      document.addEventListener('nextjs:route-change-complete', () => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    }
  `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
