import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h3: ({ children }) => (
      <a style={{ textDecoration: "none" }} href={`#${children}`}>
        <h3>{children}</h3>
      </a>
    ),
    h2: ({ children }) => (
      <a style={{ textDecoration: "none" }} href={`#${children}`}>
        <h2>{children}</h2>
      </a>
    ),
    ...components,
  };
}
