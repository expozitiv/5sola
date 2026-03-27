import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Asociația 5 Sola",
    short_name: "5SOLA.RO",
    description:
      "Conferințe Biblice & Resurse Teologice în Spiritul Reformei Protestante",
    start_url: "/",
    display: "standalone",
    background_color: "#161616",
    theme_color: "#B11F24",
    lang: "ro",
    categories: ["religion", "education"],
    icons: [
      {
        src: "/images/social_logo.jpg",
        sizes: "192x192",
        type: "image/jpeg",
        purpose: "any",
      },
      {
        src: "/images/social_logo.jpg",
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "maskable",
      },
    ],
  };
}
