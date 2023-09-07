import * as React from "react";
import { Heading } from "@radix-ui/themes";

export default function Home() {
  return (
    <main className={`[&>*]:mb-2 p-24 `}>
      <Heading size={"8"} as={"h1"} mb={"4"}>
        Resources
      </Heading>
    </main>
  );
}
