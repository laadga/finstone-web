import React from "react";
import { SiriOrb } from "./siri-orb";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

interface PersonalLandingProps {
  name: string;
  colors: {
    c1: string;
    c2: string;
    c3: string;
  };
  description: string;
  icon?: string;
  avatarSrc?: string;
}

const HeroSection: React.FC<PersonalLandingProps> = ({ name, colors, description, icon, avatarSrc }) => {
  return (
    <section className="w-full flex flex-col items-center text-center gap-6">
      <div className="relative mb-2 w-32 h-32 flex items-center justify-center">
        <SiriOrb
          size="128px"
          colors={colors}
          animationDuration={12}
          className="drop-shadow-2xl"
        />
        {/* SiriOrb animated gradient sphere - same as flipping cards */}
        <div className="absolute inset-0 flex items-center justify-center">
          <SiriOrb
            size="128px"
            colors={colors}
            animationDuration={25}
            className="drop-shadow-2xl"
          />
        </div>
      </div>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight font-geist drop-shadow-lg text-gray-800">
        {name}
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 max-w-lg mx-auto font-inter font-normal">
        {description}
      </p>
    </section>
  );
};

export const PersonalLanding = ({ name, colors, description, icon, avatarSrc }: PersonalLandingProps) => {
  return (
    <div className="w-full flex items-center justify-center bg-transparent px-4 py-16 text-gray-800 font-inter">
    <div className="w-full max-w-2xl flex flex-col items-center gap-12">
      <HeroSection name={name} colors={colors} description={description} icon={icon} avatarSrc={avatarSrc} />
    </div>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
      .font-inter { font-family: 'Inter', 'Geist', system-ui, sans-serif; }
      .font-geist { font-family: 'Geist', 'Inter', system-ui, sans-serif; }
    `}</style>
  </div>
  );
};