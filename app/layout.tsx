"use client";
import { Flex, IconButton, Link, Text, Theme, Tooltip } from "@radix-ui/themes";
import * as React from "react";
import { ReactNode } from "react";
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
const Layout = (props: LayoutProps) => (
  <html lang="en">
    <body className={"min-h-screen"}>
      <ThemeProvider>
        <LayoutBase {...props} />
      </ThemeProvider>
    </body>
  </html>
);
export default Layout;

function LayoutBase({ children }: LayoutProps) {
  const { setTheme, theme, systemTheme } = useTheme();

  return (
    <Theme
      accentColor={"jade"}
      radius="medium"
      appearance={theme !== "dark" && theme !== "light" ? "inherit" : theme}
      // suppressHydrationWarning
    >
      <nav
        className={
          "p-4 flex justify-between items-center max-w-6xl mx-auto border-b-2 border-[--gray-6]"
        }
      >
        <Link href={"/"}>
          <Text size={"4"}>Resources</Text>
        </Link>
        <Flex gap={"2"}>
          <Tooltip content="Toggle theme">
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
          </Tooltip>
          <Link href={`https://github.com/youssefbenlemlih/resources`}>
            <Tooltip content="View Source">
              <IconButton className={"cursor-pointer "}>
                <GithubIcon width="18" height="18" />
              </IconButton>
            </Tooltip>
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
    </Theme>
  );
}
