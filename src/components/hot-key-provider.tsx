"use client"

import * as React from "react"
import { HotkeysProvider } from "react-hotkeys-hook"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
    children,
    ...props
}:React.ComponentProps<typeof NextThemesProvider>){
    return <HotkeysProvider {...props}>{children}</HotkeysProvider>
}