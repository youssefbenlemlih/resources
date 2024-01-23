import { Heading, Link } from "@radix-ui/themes";
import * as React from "react";

export default function Enums() {
  return (
    <div className={`[&>*]:mb-2 `}>
      <Heading size={"8"} as={"h1"} mb={"4"}>
        Enum Types
      </Heading>
      <ul>
        <li>
          <Link href={"/enums/numeric-enums"}>Numeric Enums</Link>
        </li>
        <li>
          <Link href={"./enums/string-enums"}>String Enums</Link>
        </li>
        <li>
          <Link href={"./enums/string-literals"}>String Literals</Link>
        </li>
        <li>
          <Link href={"./enums/advanced-string-literals"}>
            Advanced String Literals
          </Link>
        </li>
      </ul>
    </div>
  );
}
