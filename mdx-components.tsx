import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h3: ({ children }) => (
      <a
        style={{ textDecoration: "none" }}
        href={`#${children?.toString().replaceAll(" ", "-")}`}
      >
        <h3
          style={{ scrollMarginTop: "120px" }}
          id={`${children?.toString().replaceAll(" ", "-")}`}
        >
          {children}
        </h3>
      </a>
    ),
    h2: ({ children }) => (
      <a
        style={{ textDecoration: "none" }}
        href={`#${children?.toString().replaceAll(" ", "-")}`}
      >
        <h2
          style={{ scrollMarginTop: "120px" }}
          id={`${children?.toString().replaceAll(" ", "-")}`}
        >
          {children}
        </h2>
      </a>
    ),
    a: ({ children }) => (
      <a href={`${children}`} target="_blank" className="prose-link">
        {children}
      </a>
    ),
    ...components,
  };
}
