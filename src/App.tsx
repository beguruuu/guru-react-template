import guruLogo from "@/assets/images/guru-text.png";

export default function App() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,_rgba(49,55,177,0.05),_transparent)]" />

      <main className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <img
          src={guruLogo}
          alt="Guru"
          className="h-40 w-auto sm:h-52 lg:h-64"
          draggable={false}
        />

        <span
          className="rounded-2xl px-6 py-3 text-sm font-semibold tracking-widest text-white shadow-lg sm:text-base"
          style={{
            background: "linear-gradient(135deg, #11162A 0%, #242E6F 50%, #3137B1 100%)",
          }}
        >
          DIGITIZE YOUR OPERATIONS WITH GURU
        </span>
      </main>
    </div>
  );
}
