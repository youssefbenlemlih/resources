import * as React from "react";
import { Heading, Link, Text } from "@radix-ui/themes";

export default function Home() {
  return (
    <main className={`[&>*]:mb-2 p-24 `}>
      <Heading size={"8"} as={"h1"} mb={"4"}>
        Resources
      </Heading>
      <ol>
        <li>
          <Link href={"./todolist"}>Todo App</Link>
        </li>
      </ol>
      <br />
      <Text>More coming soon ;)</Text>
    </main>
  );
}
