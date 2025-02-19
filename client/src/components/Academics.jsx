import React from 'react';
import '/src/Styles/Academics.css';
import Eng from '/Bamboo.jpeg';
import Man from '/Composte.jpeg';
import Adv from '/Beeswax.jpeg';
import Inc from '/EcoDetergent.jpeg';
import Res from '/JuteBag.jpeg';
import { BsGear } from "react-icons/bs";
import { GrUserManager } from "react-icons/gr";
import { SiGoogletagmanager, SiFuturelearn } from "react-icons/si";
import { MdOutlineScience } from "react-icons/md";

const ProgramCard = ({ image, icon: Icon, title }) => {
  return (
    <div className="w-full h-[250px] relative overflow-hidden rounded-lg shadow-lg">
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center transition-opacity hover:bg-opacity-60">
        <Icon className="text-white text-3xl mb-2" />
        <p className="text-white text-lg font-semibold">{title}</p>
      </div>
    </div>
  );
};

const Academics = () => {
  const programs = [
    { image: Eng, icon: BsGear, title: 'Bamboo' },
    { image: Man, icon: GrUserManager, title: 'Composte Bag' },
    { image: Adv, icon: SiGoogletagmanager, title: 'Beeswax Bag' },
    { image: Inc, icon: SiFuturelearn, title: 'Eco Detergent' },
    { image: Res, icon: MdOutlineScience, title: 'Jute Bag' },
  ];

  return (
    <div className="container mx-auto px-4 py-8" name="Prog">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {programs.map((program, index) => (
          <ProgramCard
            key={index}
            image={program.image}
            icon={program.icon}
            title={program.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Academics;