type MenuCardProps = {
  menuItems: string[];
};

export default function MenuCardList({ menuItems }: MenuCardProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {menuItems.map((item, index) => (
        <div className="flex items-center px-8 py-12 w-fit !p-0" key={index}>
          <button
            className="relative max-w-full cursor-pointer space-x-[8px] font-semibold disabled:cursor-not-allowed disabled:fill-text-disabled disabled:text-text-disabled rounded-button-sm min-h-[32px] px-[12px] py-[8px] sm:text-title-sm-medium rounded-sm border border-border-brand bg-state-layer-primary-default fill-text-brand text-text-brand hover:bg-state-layer-brand-hovered hover:fill-text-invert hover:text-text-invert focus:bg-state-layer-brand-focused focus:fill-text-brand focus:text-text-brand disabled:bg-state-layer-primary-disabled gap-x-8 h-[32px] text-title-sm-medium !leading-[18px] w-max text-sm text-body-md-regular transition-all duration-300"
            type="button"
          >
            <div className="flex items-center justify-center w-full">
              <div className="flex items-center justify-center">{item}</div>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}
