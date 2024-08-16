import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const withMDX = createMDX({
  // Add markdown plugins here, if needed
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [remarkGfm, remarkParse, remarkRehype],
    rehypePlugins: [rehypeStringify],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
