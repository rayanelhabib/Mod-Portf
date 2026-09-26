import { Navbar } from "@/components/navbar";
import { GradientWave } from "@/components/ui/gradient-wave";
import { BounceLine } from "@/components/ui/bounce-line";
import { HeroResumeButton } from "@/components/ui/hero-resume-button";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-[#16181f] selection:bg-cyan-400 selection:text-black overflow-x-hidden">
      {/* Hamish Williams Left Rail Navbar with RH Monogram */}
      <Navbar />

      {/* Hero Section with WebGL Gradient Wave & Ambient Mist */}
      <section className="relative min-h-screen w-full flex flex-col justify-start px-6 sm:px-16 md:px-20 lg:pl-36 lg:pr-12 xl:pr-14 pt-20 sm:pt-24 lg:pt-32 xl:pt-36 pb-10 overflow-hidden">
        {/* 21st.dev WebGL Gradient Wave Background */}
        <GradientWave
          colors={[
            "#00e5ff",
            "#ffffff",
            "#38bdf8",
            "#ffffff",
            "#7dd3fc",
            "#ffffff",
          ]}
          shadowPower={6}
          noiseSpeed={0.000018}
          deform={{ incline: 0.45, noiseAmp: 280, noiseFlow: 4 }}
          className="opacity-95"
        />

        {/* Brouillard atmosphérique dégradé vers le blanc pur en bas */}
        <div className="absolute inset-x-0 bottom-0 h-64 sm:h-80 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 sm:h-44 backdrop-blur-[2px] bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

        {/* Hero Content Stage */}
        <div id="hero-stage" className="relative z-20 w-full max-w-screen-2xl mx-auto flex flex-col justify-start mt-6 sm:mt-8 lg:mt-10">
          <div id="hero-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
            
            {/* GAUCHE: Structure de l'exemple avec la typographie monumentale Six Caps de Hisami Kurita */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start justify-center pb-2 sm:pb-4 pt-2 lg:pl-6 xl:pl-10 2xl:pl-14">
              
              {/* Nom en haut en capitales espacées élégantes (Style Hisami Kurita / Hamish Williams) */}
              <h2 className="font-sans text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-[0.34em] text-[#16181f]/75 mb-3 sm:mb-4 select-none font-medium">
                Rayan El Habib
              </h2>

              {/* Titre principal en typographie Six Caps (Hisami Kurita) */}
              <div className="flex flex-col w-full select-none">
                {/* Ligne 1 : DESIGNER avec trait horizontal prolongeant */}
                <div className="flex items-center gap-4 sm:gap-6 w-full">
                  <span className="font-sixcaps text-7xl sm:text-8xl md:text-9xl lg:text-[8.5rem] xl:text-[10rem] 2xl:text-[11rem] tracking-normal text-[#16181f] leading-[0.80] uppercase">
                    Designer
                  </span>
                  <div className="h-[2px] bg-[#16181f]/20 flex-1 rounded-full relative top-1" />
                </div>

                {/* Ligne 2 : + DEVELOPER */}
                <div className="flex items-center mt-1 sm:mt-2">
                  <span className="font-light text-cyan-500 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mr-2 sm:mr-3 select-none leading-none">
                    +
                  </span>
                  <span className="font-sixcaps text-7xl sm:text-8xl md:text-9xl lg:text-[8.5rem] xl:text-[10rem] 2xl:text-[11rem] tracking-normal text-[#16181f] leading-[0.80] uppercase">
                    Developer
                  </span>
                </div>
              </div>

              {/* Bouton Resume Moderne & Épuré (Incliné Hisami Kurita) */}
              <div className="mt-8 sm:mt-10">
                <HeroResumeButton href="/cv.pdf" />
              </div>

            </div>

            {/* DROITE: Silhouette transparente agrandie, posée sur le séparateur */}
            <div className="lg:col-span-5 xl:col-span-6 flex justify-center lg:justify-end items-end lg:translate-x-6 xl:translate-x-10 2xl:translate-x-14">
              <div className="relative w-[380px] sm:w-[440px] lg:w-[500px] xl:w-[560px] 2xl:w-[600px] max-w-full flex items-end translate-y-[32px] sm:translate-y-[36px] lg:translate-y-[40px] z-20">
                {/* Aura lumineuse subtile cyan derrière le corps */}
                <div className="absolute inset-x-8 bottom-3 h-3/4 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10" />

                {/* Silhouette transparente de Rayan */}
                <img
                  src="/Profil_Transparent_Cropped.png"
                  alt="Rayan El Habib"
                  className="w-full h-auto object-contain object-bottom block select-none pointer-events-none drop-shadow-[0_25px_50px_rgba(22,24,31,0.2)]"
                  draggable={false}
                />
              </div>
            </div>

          </div>

          {/* Séparateur interactif élastique Hisami Kurita (AppBounceLine) - La silhouette est posée dessus */}
          <div className="w-full relative z-30 mt-4 sm:mt-6">
            <BounceLine
              strokeColor="#16181f"
              strokeWidth={1.5}
              className="opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* Section suivante: Fond blanc pur qui s'enchaîne sans coupure */}
      <section className="relative z-20 min-h-[40vh] w-full bg-white px-6 sm:px-16 md:px-24 lg:pl-36 lg:pr-24 py-20 flex flex-col items-center">
        {/* Contenu suivant */}
      </section>
    </div>
  );
}
