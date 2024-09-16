import React from 'react';
import { Instagram, Github } from 'lucide-react';
import Link from 'next/link';

interface ISocial {
  name: string;
  icon: React.ComponentType;
  link: string;
}

const socials: ISocial[] = [
  {
    name: 'Instagram',
    icon: Instagram,
    link: 'https://www.instagram.com/',
  },
  {
    name: 'GitHub',
    icon: Github,
    link: 'https://www.github.com/',
  },
];

export default function Footer() {
  return (
    <main className="mt-auto flex w-full flex-col items-center justify-center bg-primary_blue p-8 text-white">
      <p>Made by UCDavis Students for UCDavis Students &lt;3</p>
      <div className="flex items-center justify-center gap-2 p-4 ">
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <Link
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white"
            >
              <Icon />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
