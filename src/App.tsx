export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.2),_transparent_55%)]" />
      <div className="absolute inset-0 opacity-40 mix-blend-screen">
        <div className="animate-[pulse_10s_ease-in-out_infinite] bg-[radial-gradient(circle,_rgba(56,189,248,0.12),_transparent_55%)] blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 sm:px-10 lg:px-0">
        <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-start">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-sky-300 shadow-[0_0_30px_rgba(56,189,248,0.25)] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]" />
              Guru
            </p>

            <h1 className="bg-gradient-to-br from-white via-sky-100 to-sky-400 bg-clip-text text-4xl font-semibold leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl">
              Welcome.{" "}
              <span className="inline-block animate-[fadeInUp_0.7s_ease-out_forwards] opacity-0 [animation-delay:0.15s]">
                Let&apos;s build your
              </span>
              <br />
              <span className="relative inline-block animate-[fadeInUp_0.7s_ease-out_forwards] opacity-0 [animation-delay:0.3s]">
                Operating System.
                <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-[2px] bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 blur-[2px]" />
              </span>
            </h1>

            <p className="max-w-xl text-sm text-slate-300/90 sm:text-base">
              Start by describing{" "}
              <span className="font-semibold text-sky-200">
                how your team works day to day
              </span>
              , or upload the spreadsheets you already use. Guru will guide you,
              ask the right questions, and turn your requests into software.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-sky-500 px-6 py-2.5 text-sm font-medium text-slate-950 shadow-[0_18px_60px_rgba(56,189,248,0.5)] transition hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
                <span className="absolute inset-0 bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative flex items-center gap-2">
                  Describe how you work
                  <span className="h-1.5 w-1.5 animate-[ping_1s_ease-out_infinite] rounded-full bg-white" />
                </span>
              </button>

              <button className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/60 px-5 py-2.5 text-sm font-medium text-slate-100 shadow-[0_16px_40px_rgba(15,23,42,0.75)] backdrop-blur transition hover:border-sky-400/80 hover:bg-slate-900/80">
                <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-slate-800/80 text-xs text-sky-300 ring-1 ring-slate-600/80 group-hover:ring-sky-400/70">
                  XLS
                </span>
                Upload spreadsheets
              </button>
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400 sm:justify-start">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800/80 bg-slate-900/60 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.85)]" />
                Built with your real workflows
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-1 justify-center lg:mt-0">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-sky-400/60 via-cyan-300/40 to-indigo-500/50 opacity-60 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-950/80 p-4 shadow-[0_26px_80px_rgba(15,23,42,0.95)] backdrop-blur-xl">
                <div className="mb-3 flex items-center justify-between text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-500/80" />
                    <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-sky-200 ring-1 ring-slate-700/80">
                    Guru · Flow builder
                  </span>
                </div>

                <div className="relative mt-1 h-56 overflow-hidden rounded-2xl border border-slate-800/70 bg-gradient-to-b from-slate-950/90 via-slate-950 to-slate-950/95 px-3 py-3 text-[11px] text-slate-200">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%)] opacity-60" />
                  <div className="pointer-events-none absolute inset-x-0 -top-1 h-8 translate-y-[-100%] bg-gradient-to-b from-sky-500/25 via-transparent to-transparent blur-2xl opacity-70 animate-[terminal-scan_6s_linear_infinite]" />

                  <div className="relative space-y-2 font-[family-name:var(--font-geist-mono)]">
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span className="text-sky-300">guru@os</span>
                      <span className="text-slate-500">in</span>
                      <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[9px] text-sky-200">
                        /flows/sales
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="mt-[1px] h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
                      <span className="text-emerald-300">
                        team.describe(&quot;how we work every day&quot;)
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-sky-200">
                      <span className="text-slate-500">$</span>
                      <span className="truncate">
                        guru build --from &quot;shared spreadsheet&quot; --with
                        approvals --notify sales
                      </span>
                      <span className="ml-1 inline-block h-3 w-[2px] animate-pulse rounded-full bg-sky-200" />
                    </div>

                    <div className="mt-3 space-y-1.5">
                      <div className="h-1.5 w-[86%] rounded-full bg-gradient-to-r from-sky-400/70 via-cyan-300/80 to-emerald-300/60 opacity-80 animate-pulse" />
                      <div className="h-1.5 w-[72%] rounded-full bg-slate-800/90 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0 [animation-delay:0.1s]" />
                      <div className="h-1.5 w-[64%] rounded-full bg-slate-800/90 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0 [animation-delay:0.18s]" />
                      <div className="h-1.5 w-[52%] rounded-full bg-slate-800/90 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0 [animation-delay:0.26s]" />
                      <div className="h-1.5 w-[40%] rounded-full bg-slate-800/90 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0 [animation-delay:0.34s]" />
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-0.5 ring-1 ring-slate-700/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                        Flow compiled
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-0.5 ring-1 ring-slate-700/80">
                        + dashboards, automations, approvals
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
