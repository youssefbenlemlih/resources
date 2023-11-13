"use client";
import * as React from "react";
import { Box, Link } from "@radix-ui/themes";
import { usePathname } from "next/navigation";

const DATA_FOLDER_PATH =
  "https://github.com/youssefbenlemlih/resources/edit/main/data";

export function EditOnGithub() {
  const pathname = usePathname();

  // const routerSlug = router.query.slug;
  // let filePath = `${DATA_FOLDER_PATH}/${router.pathname.replace('/', '')}`;
  // if (Array.isArray(routerSlug)) {
  //   filePath = filePath.replace('[...slug]', routerSlug.join('/'));
  // } else {
  //   filePath = filePath.replace('[slug]', routerSlug||"");
  // }
  // const editUrl = `${filePath}.mdx`;

  return (
    <Box>
      {/*<Separator size="2" my="8" />*/}
      <Link
        // href={editUrl}
        title="Edit this page on GitHub."
        rel="noopener noreferrer"
        target="_blank"
        color="gray"
        size="2"
      >
        Edit this page on GitHub.({pathname})
      </Link>
    </Box>
  );
}
