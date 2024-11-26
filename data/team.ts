import MaleProfile from '@/public/assets/about/male-profile.svg';
import FemaleProfile from '@/public/assets/about/female-profile.svg';

export interface TeamLeader {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  email: string;
}

export const leaders: TeamLeader[] = [
  {
    name: "Julia Eskelson",
    role: "Lead Brand Strategist & Marketing Specialist",
    bio: "With a background in professional photography and digital design. Specializes in creating authentic, engaging brand identities that combine creative vision with strategic marketing, while maintaining a focus on consistency and measurable results.",
    image: FemaleProfile,
    linkedin: "https://www.linkedin.com/in/julia-eskelson/",
    email: "jeskelson@mindandmetricsbranding.com"
  },
  {
    name: "Travis Rollins",
    role: "Lead Software Engineer",
    bio: "With 7+ years of software development expertise and educational leadership. Specializes in creating powerful digital experiences that combine technical excellence with intuitive design, while maintaining a focus on accessibility and best practices.",
    image: MaleProfile,
    linkedin: "https://www.linkedin.com/in/travisrollins/",
    email: "trollins@mindandmetricsbranding.com"
  }
]; 