"use client";

import { Flex, IconButton, Link, Text, Theme } from "@radix-ui/themes";
import * as React from "react";
import { ReactNode, useEffect, useState } from "react";
import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";
import {
  GithubIcon,
  MonitorSmartphoneIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { useTheme } from "next-themes";

type LayoutProps = { children: ReactNode };
const Layout = ({ children }: LayoutProps) => (
  <html lang="en">
    <body className={"min-h-screen"}>
      <ThemeProvider>
        <LayoutBase>{children}</LayoutBase>
      </ThemeProvider>
    </body>
  </html>
);
export default Layout;

function LayoutBase({ children }: LayoutProps) {
  const { setTheme, theme, systemTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false); // Need this for the react-tooltip

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Theme
      accentColor={"jade"}
      radius="medium"
      appearance={
        !isMounted
          ? undefined
          : theme !== "dark" && theme !== "light"
            ? "inherit"
            : theme
      }
      // suppressHydrationWarning
    >
      <div>
        <nav
          className={
            "p-4 flex justify-between items-center max-w-6xl mx-auto border-b-2 border-[--gray-6]"
          }
        >
          <Link href={"/"}>
            <Text size={"4"}>Resources</Text>
          </Link>
          <Flex gap={"2"}>
            {isMounted && (
              <IconButton
                onClick={() =>
                  setTheme(
                    theme === "dark"
                      ? "light"
                      : theme === "light"
                        ? "system"
                        : "dark",
                  )
                }
                variant={"soft"}
                className={"cursor-pointer"}
              >
                {theme === "light" ? (
                  <SunIcon width="18" height="18" />
                ) : theme === "dark" ? (
                  <MoonIcon width="18" height="18" />
                ) : (
                  <MonitorSmartphoneIcon width="18" height="18" />
                )}
              </IconButton>
            )}
            <Link href={`https://github.com/youssefbenlemlih/resources`}>
              <IconButton className={"cursor-pointer "}>
                <GithubIcon width="18" height="18" />
              </IconButton>
            </Link>
          </Flex>
        </nav>
        <main className={"px-4 py-8 mx-auto max-w-6xl min-h-[80vh]"}>
          {children}
        </main>
        <footer
          className={
            "p-4 flex justify-between items-center max-w-6xl mx-auto border-t-2 border-[--gray-6]"
          }
        >
          {/*<EditOnGithub />*/}
        </footer>
      </div>
    </Theme>
  );
}
