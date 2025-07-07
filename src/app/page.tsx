'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
// import Background from "../components/background";
import TrueFocus from "../components/truefocus";
// import GlitchText from "../components/glitchtext";
import FuzzyText from "@/components/fuzzytext";
import LetterGlitch from '../components/background';

export default function Home() {
  const [showLogo, setShowLogo] = useState(false);
  const [showTrueFocus, setShowTrueFocus] = useState(false);
  const [showFuzzyText, setShowFuzzyText] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(true), 500); // Show after 0.5s
    const timer2 = setTimeout(() => setShowTrueFocus(true), 1000); // Show after 1s
    const timer3 = setTimeout(() => setShowFuzzyText(true), 1500); // Show after 1.5s

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      {/* Background component */}
      <div className="absolute inset-0 z-0">

        <LetterGlitch
  glitchSpeed={50}
  centerVignette={true}
  outerVignette={false}
  glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
  smooth={true}
/>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-white">
        {/* Logo */}
        <div className={`mb-8 transition-opacity duration-1000 ${showLogo ? 'opacity-100' : 'opacity-0'}`}>
          <Image
            src="/logo.svg"
            alt="GoSimple Logo"
            width={200}
            height={200}
            priority
            className="mx-auto"
          />
        </div>

        {/* GoSimple text using TrueFocus component */}
        <div className={`mb-16 transition-opacity duration-1000 ${showTrueFocus ? 'opacity-100' : 'opacity-0'}`}>
          <TrueFocus
            sentence="Go Simple"
            manualMode={false}
            blurAmount={3}
            borderColor="white"
            glowColor="rgba(255, 255, 255, 0.6)"
            animationDuration={2}
            pauseBetweenAnimations={1.5}
          />
        </div>

        {/* Coming Soon text using GlitchText component */}
        <div className={`transition-opacity duration-1000 ${showFuzzyText ? 'opacity-100' : 'opacity-0'}`}>
          {/* <GlitchText 
            speed={0.5}
            enableShadows={true}
            enableOnHover={false}
            className="text-white"
          >
            Coming Soon
          </GlitchText> */}
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={1}
            enableHover={true}
          >
            Coming Soon
          </FuzzyText>
        </div>
      </div>
    </div>
  );
}