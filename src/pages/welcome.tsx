import guruLogo from "@/assets/images/guru-text.png";
import isometricFactory from "@/assets/images/guru-template-isometric.webp";

const C = {
  darkNavy: "#11162A",
  midBlue: "#242E6F",
  guruBlue: "#3137B1",
};

export function WelcomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 lg:px-16 overflow-hidden">
      <div className="flex w-full max-w-[1440px] flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
        {/* Left side - Logo & tagline */}
        <div className="flex flex-col gap-6 lg:gap-8 max-w-[560px] animate-in fade-in slide-in-from-left-8 duration-700">
          <img
            src={guruLogo}
            alt="GURU"
            className="h-36 sm:h-44 lg:h-52 w-auto"
            draggable={false}
          />

          <div className="flex flex-col gap-1">
            <p
              className="text-lg sm:text-xl lg:text-[1.6rem] font-bold tracking-wide leading-snug"
              style={{
                background: `linear-gradient(135deg, ${C.darkNavy} 0%, ${C.midBlue} 50%, ${C.guruBlue} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Build & Customize your Operating System
            </p>
            <p
              className="text-base sm:text-lg lg:text-xl italic font-light"
              style={{ color: C.midBlue }}
            >
              step by step — just by chatting
            </p>
          </div>
        </div>

        {/* Right side - Isometric factory image */}
        <div className="flex-shrink-0 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
          <img
            src={isometricFactory}
            alt="Isometric Factory"
            className="w-[360px] sm:w-[500px] lg:w-[640px] xl:w-[750px] h-auto"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
