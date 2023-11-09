import * as React from "react";
import { Heading, Link, Text } from "@radix-ui/themes";

export default function Home() {
  return (
    <div className={`[&>*]:mb-2 `}>
      <Heading size={"8"} as={"h1"} mb={"4"}>
        Resources
      </Heading>
      <ul>
        <li>
          <Link href={"./todolist"}>Todo App</Link>
        </li>
      </ul>
      <br />
      <Text>More coming soon ;)</Text>
    </div>
  );
}
