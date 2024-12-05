import { HiLightBulb, HiCamera, HiCommandLine, HiChartBar } from 'react-icons/hi2';
import { IconType } from 'react-icons';

export interface AboutCard {
  icon: IconType;
  title: string;
  subtitle: string;
  position: {
    top: string;
    left?: string;
    right?: string;
  };
  rotation: number;
}

export const aboutCards: AboutCard[] = [
  {
    icon: HiLightBulb,
    title: "Strategic Vision",
    subtitle: "Data-Driven Planning",
    position: {
      top: "-4rem",
      right: "1rem"
    },
    rotation: -6
  },
  {
    icon: HiCamera,
    title: "Creative Design",
    subtitle: "Brand Excellence",
    position: {
      top: "2rem",
      left: "1rem"
    },
    rotation: 3
  },
  {
    icon: HiCommandLine,
    title: "Technical Mastery",
    subtitle: "Development & Innovation",
    position: {
      top: "8rem",
      right: "2rem"
    },
    rotation: -3
  },
  {
    icon: HiChartBar,
    title: "Measurable Impact",
    subtitle: "Results That Matter",
    position: {
      top: "14rem",
      left: "2rem"
    },
    rotation: 6
  }
]; 