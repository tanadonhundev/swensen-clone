import React from 'react';

type MenuItem = {
  label: string;
  href: string;
};

type MenuLinksProps = {
  items: MenuItem[];
};

const MenuLinks: React.FC<MenuLinksProps> = ({ items }) => {
  return (
    <div className="flex flex-wrap items-center gap-12 @xl:grow @sm:justify-center @xl:justify-evenly @xl:gap-0">
      {items.map((item, index) => (
        <div className="pt-0" key={index}>
          <a
            target="_blank"
            href={item.href}
            className="px-4 py-8 text-title-sm-medium text-text-invert @sm:py-0"
          >
            {item.label}
          </a>
        </div>
      ))}
    </div>
  );
};

export default MenuLinks;
