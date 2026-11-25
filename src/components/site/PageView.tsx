import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PageDef } from "@/lib/pages";
import { FinalCta } from "./Home";

export function PageView({ page }: { page: PageDef }) {
  return (
    <>
      <section className="bg-[#faf6f1] pb-20 pt-24 text-center lg:pt-32">
        <div className="container-x max-w-3xl">
          <p className="eyebrow text-muted">{page.eyebrow}</p>
          <h1 className="display h-xl mt-5 text-ink2" style={{ fontSize: "clamp(2.2rem,5vw,3.75rem)" }}>{page.title}</h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-7 text-ink2">{page.lede}</p>
          {page.cta && <Link href="/signup" className="btn btn-primary btn-lg mt-8">Sign up <ArrowRight size={16} /></Link>}
        </div>
      </section>

      {page.legal ? (
        <section className="bg-bg py-16"><div className="container-x max-w-3xl space-y-10">
          {page.sections.map((s) => <div key={s.title}><h2 className="text-[20px] font-medium tracking-tight">{s.title}</h2><p className="mt-2 text-[15px] leading-7 text-ink2">{s.body}</p></div>)}
        </div></section>
      ) : (
        <section className="bg-bg py-20"><div className="container-x grid gap-5 md:grid-cols-2">
          {page.sections.map((s, i) => (
            <div key={s.title} className="card-lift rounded-[24px] bg-white p-9">
              <span className="eyebrow text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="h-sm mt-3 text-[24px]">{s.title}</h2>
              <p className="mt-3 text-[14.5px] leading-6 text-ink2">{s.body}</p>
            </div>
          ))}
        </div></section>
      )}

      {page.steps && (
        <section className="bg-[#faf6f1] py-20"><div className="container-x">
          <h2 className="display h-md text-center text-ink2">How it works</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {page.steps.map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-line bg-white p-7"><span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-[13px] text-white">{i + 1}</span><h3 className="mt-4 text-[18px] font-medium">{s.title}</h3><p className="mt-2 text-[14px] text-ink2">{s.body}</p></div>
            ))}
          </div>
        </div></section>
      )}

      {page.band && (
        <section className="bg-[#fba98a] py-20 text-center"><div className="container-x max-w-2xl"><h2 className="display h-md">{page.band.title}</h2><p className="mt-4 text-[15px]">{page.band.body}</p></div></section>
      )}
      <FinalCta />
    </>
  );
}
