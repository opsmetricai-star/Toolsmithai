import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageView } from "@/components/site/PageView";
import { PAGES } from "@/lib/pages";

const RESERVED = new Set(["products/agent"]);
const keyOf = (slug: string[]) => slug.join("/");

export function generateStaticParams() {
  return Object.keys(PAGES).filter((k) => !RESERVED.has(k)).map((k) => ({ slug: k.split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PAGES[keyOf(slug)];
  return p ? { title: p.title, description: p.lede } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const key = keyOf(slug);
  const page = PAGES[key];
  if (!page || RESERVED.has(key)) notFound();
  return <SiteShell><PageView page={page} /></SiteShell>;
}
