export const siteConfig = {
  name: "Moonwitness UI",
  url:
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://ui.moonwitness.biz.id"
      : "http://localhost:4000"),
  ogImage: "/opengraph-image",
  tagline: "Observe. Understand. Preserve.",
  description:
    "The interface language of a living knowledge ecosystem. Build accessible, evidence-conscious digital experiences with Moonwitness UI.",
  repository: "https://github.com/BRIDGE-ALLAH/MW-UI",
  repositoryApi: "https://api.github.com/repos/BRIDGE-ALLAH/MW-UI",
  links: {
    github: "https://github.com/BRIDGE-ALLAH/MW-UI",
    upstream: "https://ui.shadcn.com",
  },
  navItems: [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/docs/installation",
      label: "Docs",
    },
    {
      href: "/docs/components",
      label: "Components",
    },
    {
      href: "/blocks",
      label: "Blocks",
    },
    {
      href: "/charts/area",
      label: "Charts",
    },
    {
      href: "/docs/directory",
      label: "Directory",
    },
    {
      href: "/typeset",
      label: "Typeset",
    },
    {
      href: "/create",
      label: "Create",
    },
  ],
}

export const META_THEME_COLORS = {
  light: "#f7f4ec",
  dark: "#07060b",
}
