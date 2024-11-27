import { 
  HiOutlinePuzzlePiece,
  HiOutlinePresentationChartLine,
  HiOutlineLightBulb,
  HiOutlineUserGroup,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineChatBubbleLeftRight
} from 'react-icons/hi2';
import { IconType } from 'react-icons';

export interface CulturePoint {
  icon: IconType;
  title: string;
  description: string;
}

export const culturePoints: CulturePoint[] = [
  {
    icon: HiOutlinePuzzlePiece,
    title: "Know the Mission",
    description: "Preparation sets the foundation. Know the plan, gather the right tools, and start with focus and intention."
  },
  {
    icon: HiOutlinePresentationChartLine,
    title: "Resilient Adaptability",
    description: "Challenges will come - stay focused and keep moving forward. Progress is built through persistence."
  },
  {
    icon: HiOutlineLightBulb,
    title: "Be Willing to Fail",
    description: "Learn, adapt, and keep moving forward. We view failure as an opportunity to learn, grow, and continuously improve."
  },
  {
    icon: HiOutlineUserGroup,
    title: "Support the Team",
    description: "Help where you can. Strong teams deliver the best results by working together and communicating."
  },
  {
    icon: HiOutlineGlobeAsiaAustralia,
    title: "Be Respectful",
    description: "Respect time, ideas, and people. Listening and being courteous goes a long way in building trust."
  },
  {
    icon: HiOutlineChatBubbleLeftRight,
    title: "Communicate Clearly",
    description: "Keep the conversation flowing—with the team, yourself, and clients. Speak up, stay open, and make sure everyone's on the same page."
  }
];