import guruLogo from "@/assets/images/guru-text.png";

export function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
      <div className="flex flex-col items-center gap-5">
        <img
          src={guruLogo}
          alt="Guru"
          className="h-48 w-auto sm:h-48"
          draggable={false}
        />

        <p className="text-center text-sm font-light tracking-[0.22em] text-slate-400 uppercase sm:text-4xl">
          Digitize your operations with{" "}
          <span
            className="font-semibold tracking-widest"
            style={{
              background: "linear-gradient(135deg, #11162A, #242E6F, #3137B1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            GURU
          </span>
        </p>
      </div>
    </div>
  );
}
