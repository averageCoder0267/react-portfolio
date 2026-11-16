import urbanist from "@/font/Urbanist";
import "./globals.css";

export const metadata = {
  title: "Yash Jain | Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Next.js, Node.js, and MongoDB. Building modern web applications and scalable SaaS platforms.",
  keywords: [
    "Yash Jain",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "MongoDB",
    "Web Developer",
    "SaaS Development",
  ],
  authors: [{ name: "Yash Jain" }],
  creator: "Yash Jain",
  openGraph: {
    title: "Yash Jain | Full Stack Developer",
    description:
      "Building modern web applications and scalable SaaS platforms.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yash Jain Portfolio Website",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Jain | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and MongoDB.",
    images: ["/og-image.png"],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${urbanist.variable}`}>
      <body>{children}</body>
    </html>
  );
};
