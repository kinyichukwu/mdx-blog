import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h3: ({ children }) => (
      <a style={{ textDecoration: "none" }} href={`#${children}`}>
        <h3>{children}</h3>
      </a>
    ),
    h2: ({ children }) => (
      <a
        style={{ textDecoration: "none" }}
        href={`#${
          children && typeof children === "string"
            ? children.split(" ").join("-").toLowerCase()
            : children
        }`}
      >
        <h2>{children}</h2>
      </a>
    ),
    a: ({ children, href }) => (
      <a
        style={{ color: "rgb(155 225 0)" }}
        className="hover:opacity-70"
        href={`${href}`}
      >
        {children}
      </a>
    ),
    ...components,
  };
}
