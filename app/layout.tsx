import { Theme } from "@radix-ui/themes";
import * as React from "react";
import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";

export default function Layout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Theme accentColor={"ruby"} radius="medium">
          {children}
        </Theme>
      </body>
    </html>
  );
}
