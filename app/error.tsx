"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, RefreshCcw, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="container flex items-center justify-center min-h-[70vh] py-12">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-red-100 p-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>

          <p className="text-muted-foreground mb-6">
            We're sorry, but we encountered an unexpected error. Our team has been notified.
          </p>

          <div className="space-y-3">
            <Button onClick={reset} className="w-full">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>

            <Button variant="outline" asChild className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </Button>
          </div>

          {error.digest && <p className="mt-4 text-xs text-muted-foreground">Error ID: {error.digest}</p>}
        </CardContent>
      </Card>
    </div>
  )
}
