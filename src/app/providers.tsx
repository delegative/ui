"use client";

import { ThemeProvider } from "next-themes";
import { SismoWrapper } from "./components/SismoProvider";
import { GoveranceProvider } from "./components/GoveranceProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
            <SismoWrapper>
                <GoveranceProvider>
                    {children}
                </GoveranceProvider>
            </SismoWrapper>
        </ThemeProvider>
    );
}
