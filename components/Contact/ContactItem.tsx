import { ReactNode } from 'react';

interface ContactItemProps {
  icon: ReactNode;
  title: string;
  content: ReactNode;
}

export default function ContactItem({ icon, title, content }: ContactItemProps) {
  return (
    <li className="flex items-start space-x-4">
      <span className="bg-neutral-50 p-3 rounded-full shrink-0">
        {icon}
      </span>
      <article>
        <h3 className="font-serif text-lg text-dark-800 mb-2">{title}</h3>
        {content}
      </article>
    </li>
  );
} 