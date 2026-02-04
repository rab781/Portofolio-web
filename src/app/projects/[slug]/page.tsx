import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectClientWrapper from "@/components/ProjectClientWrapper";

// Note: In a client component, we can't export async generateStaticParams directly in the same way if strictly strictly 'use client', 
// but for Next.js app router hybrid, we often keep the page server-side or mix. 
// However, to use Framer Motion, we need 'use client'. 
// A common pattern is to wrap the content or just make this page client. 
// Since generateStaticParams is a server feature, we'll assume this file was originally server.
// To use Motion, let's keep it simple: We will NOT animate the layout root to avoid hydration issues, 
// or we just animate the inner content.
// Actually, let's just use standard <img> tags or className animations if we want to keep it server-side, 
// OR we make it a client component and lose generateStaticParams export from *this* file (moved to layout or separate).
//
// BUT, to keep the user's existing build working:
// We will return a CLIENT component from a SERVER wrapper if needed, OR just use standard Next.js logic.
// The easiest refactor that maintains "Winner Awards" feel is to just use CSS animations + correct styling 
// without converting the whole page to client if we want to keep generateStaticParams here.
//
// Wait, the previous file had `export async function generateStaticParams`. 
// If I make this `use client`, that export breaks.
// SOLUTION: I will keep this component SERVER SIDE, but render the *content* using a new client component wrapper 
// or just use standard CSS classes. The user asked for "Seirama" (Matching). 
// The main page uses Framer Motion. I can import a Client Component for the content.

// Let's create `ProjectContent.tsx` first? No, that's too many files.
// I will keep it Server Side for SEO/Performance, and use the new CSS classes (`bg-noise`, etc).
// I will use `motion` via a small inline wrapper if needed, but standard CSS `animate-fade-in-up` is already global!

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return <ProjectClientWrapper project={project} />;
}