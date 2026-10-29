"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

type Provider = "github" | "google"

export default function SignInPage() {
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSignIn(provider: Provider) {
    setLoadingProvider(provider)
    setErrorMessage(null)

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      })

      if (error) {
        setErrorMessage(error.message ?? "Unable to sign in. Please try again.")
      }
    } catch {
      setErrorMessage("Unable to sign in right now. Please try again.")
    } finally {
      setLoadingProvider(null)
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/40 px-4 py-10">
      <section
        aria-labelledby="sign-in-title"
        className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-sm"
      >
        <Link
          href="/"
          className="inline-flex text-2xl font-bold tracking-tight text-foreground"
        >
          Postgirl
        </Link>

        <h1
          id="sign-in-title"
          className="mb-1 mt-6 text-xl font-semibold tracking-tight"
        >
          Sign in to Postgirl
        </h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Sign in to continue.
        </p>

        <div className="mt-6 grid gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full justify-start gap-3 px-4"
            disabled={loadingProvider !== null}
            onClick={() => handleSignIn("github")}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.21 3.26.92.1-.72.39-1.21.71-1.49-2.47-.28-5.06-1.24-5.06-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.59 5.23-5.07 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
            </svg>
            {loadingProvider === "github" ? "Connecting..." : "Sign in with GitHub"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="h-11 w-full justify-start gap-3 px-4"
            disabled={loadingProvider !== null}
            onClick={() => handleSignIn("google")}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84A11 11 0 0 0 12 23Z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.15a11 11 0 0 0 0 9.9l3.69-2.84Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.36c1.62 0 3.07.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0a11 11 0 0 0-9.85 7.05l3.69 2.84C6.71 7.29 9.14 4.36 12 4.36Z"
              />
            </svg>
            {loadingProvider === "google" ? "Connecting..." : "Sign in with Google"}
          </Button>
        </div>

        {errorMessage && (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {errorMessage}
          </p>
        )}
      </section>
    </main>
  )
}
