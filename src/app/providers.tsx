"use client";

import { ThemeProvider } from "next-themes";
import { SismoWrapper } from "./components/SismoProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
            <SismoWrapper>
                {children}
            </SismoWrapper>
        </ThemeProvider>
    );
}
