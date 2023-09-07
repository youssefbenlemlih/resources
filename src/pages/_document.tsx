import { Head, Html, Main, NextScript } from "next/document";
import { Theme } from "@radix-ui/themes";
import * as React from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Theme accentColor={"ruby"} radius="medium">
          <Main />
          <NextScript />
        </Theme>
      </body>
    </Html>
  );
}
