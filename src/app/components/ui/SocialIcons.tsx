import Image from "next/image";
import React from "react";

type SocialIcon = {
  href: string;
  src: string;
  alt: string;
};

type SocialIconsProps = {
  items: SocialIcon[];
};

const SocialIcons: React.FC<SocialIconsProps> = ({ items }) => {
  return (
    <ul className="footer-menu footer-primary-menu flex shrink-0 flex-row flex-wrap gap-x-8">
      {items.map((icon, index) => (
        <li key={index}>
          <a href={icon.href} target="_blank">
            <Image
              src={icon.src}
              alt={icon.alt}
              width={32}
              height={32}
              className="shrink-0"
            />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialIcons;
