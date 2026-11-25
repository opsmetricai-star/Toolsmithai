export function Faq({ items, title = "Frequently asked questions" }: { items: string[][]; title?: string }) {
  return (
    <section className="bg-bg py-20">
      <div className="container-x max-w-3xl">
        <h2 className="display h-md text-center text-ink2">{title}</h2>
        <div className="mt-10 divide-y divide-line rounded-2xl border border-line bg-white">
          {items.map(([q, a]) => (
            <details key={q} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15.5px] font-medium">
                {q}<span className="text-xl text-muted transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[14.5px] leading-6 text-ink2">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
