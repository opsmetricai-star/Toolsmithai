import "server-only";

const MODELS = () => [process.env.GEMINI_MODEL || "gemini-3.8-flash", "gemini-3.8-flash", "gemini-3.7-flash", "gemini-3.6-flash", "gemini-3.5-flash", "gemini-flash-latest"];

export type GenResult = { summary: string; html: string; model: string };

const SYSTEM = `You are ToolSmithAi, an expert front-end engineer. You build complete, working, self-contained single-file web projects.
Rules:
- Output ONE complete HTML document (<!doctype html> ... </html>) with all CSS in <style> and all JS in <script>.
- No build step. You may load libraries from https://cdn.jsdelivr.net or https://unpkg.com (e.g. three.js, chart.js) when useful.
- It must run inside a sandboxed iframe: do not use localStorage-dependent logic without try/catch, no alert/prompt, no external form posts.
- Make it responsive, accessible, polished, with real content (no lorem ipsum placeholders).
- When revising, return the FULL updated document, preserving what the user did not ask to change.
Respond as JSON: {"summary": "<=2 sentences describing what you built or changed", "html": "<full document>"}.`;

const MODE_HINT: Record<string, string> = {
  website: "Build a multi-section marketing/portfolio website.",
  mobile: "Design for a 390px-wide phone viewport, centered in a phone-shaped frame on larger screens.",
  design: "Produce a visually distinctive design exploration with strong typography and layout.",
  slides: "Build a keyboard-navigable slide deck (arrow keys, progress indicator), one slide per screen.",
  animation: "Build an animation using CSS/Canvas/SVG with play/pause controls.",
  dataviz: "Build an interactive data visualization with embedded sample data, tooltips and filters.",
  game: "Build a playable 3D game using three.js from a CDN, with controls explained on screen.",
  document: "Build a print-ready document layout with a print stylesheet and a Print button.",
  spreadsheet: "Build a spreadsheet-like tool with editable cells, live formulas and totals.",
};

function extractJson(text: string): { summary?: string; html?: string } | null {
  try {
    return JSON.parse(text);
  } catch {
    const m = text.match(/\{[\s\S]*\}/);
    if (m) {
      try {
        return JSON.parse(m[0]);
      } catch {
        /* fallthrough */
      }
    }
    return null;
  }
}

export async function generateProject(args: {
  mode: string;
  prompt: string;
  currentHtml?: string;
  history?: { role: "user" | "assistant"; content: string }[];
}): Promise<GenResult> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("AI generation is temporarily unavailable. Please try again shortly.");

  const contents = [
    ...(args.history ?? []).slice(-6).map((m) => ({ role: m.role === "user" ? "user" : "model", parts: [{ text: m.content }] })),
    {
      role: "user",
      parts: [
        {
          text:
            (args.currentHtml ? `CURRENT DOCUMENT:\n${args.currentHtml}\n\nREQUESTED CHANGE:\n` : `PROJECT TYPE: ${args.mode}. ${MODE_HINT[args.mode] ?? ""}\n\nREQUEST:\n`) +
            args.prompt,
        },
      ],
    },
  ];

  let lastErr = "Generation failed";
  const deadline = Date.now() + 270_000; // stay inside the route's 300s limit
  for (const model of [...new Set(MODELS())]) {
    for (let attempt = 0; attempt < 1; attempt++) {
      if (Date.now() > deadline - 20_000) throw new Error("Generation timed out. Please try again.");
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM }] },
          contents,
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: { summary: { type: "STRING" }, html: { type: "STRING" } },
              required: ["summary", "html"],
            },
            temperature: 0.8,
            maxOutputTokens: 60000,
          },
        }),
        signal: AbortSignal.timeout(Math.max(10_000, Math.min(150_000, deadline - Date.now()))),
      }).catch((e) => ({ ok: false, status: 0, json: async () => ({ error: { message: String(e) } }) }) as Response);

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        const text: string = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ?? "";
        const parsed = extractJson(text);
        const html = parsed?.html?.trim();
        if (html && /<html|<!doctype/i.test(html)) {
          return { summary: parsed?.summary ?? "Done.", html, model };
        }
        lastErr = "The model returned an invalid document. Try rephrasing.";
        continue;
      }
      lastErr = data?.error?.message ?? `Gemini error ${res.status}`;
      // unavailable, overloaded or rate-limited: move on to the next model
      if ([404, 429, 500, 503, 0].includes(res.status)) break;
      throw new Error(lastErr);
    }
  }
  throw new Error(lastErr);
}
