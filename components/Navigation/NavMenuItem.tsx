import { FC, ReactNode } from 'react';

interface INavMenuItemProps {
  title: string;
  icon?: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

const NavMenuItem: FC<INavMenuItemProps> = ({
  title,
  icon,
  active,
  onClick
}: INavMenuItemProps) => {
  return (
    <div className="px-6">
      <button
        className={`px-1 mx-auto flex flex-col md:flex-row h-12 md:h-16 outline-none tracking-wide text-lg items-center hover:text-gray-600 hover:border-gray-600 hover:bg-gray-50 border-transparent hover:border-current focus:outline-none focus:text-gray-600 cursor-pointer ${
          active && `border-gray-600 border-b-2`
        }`}
        onClick={onClick}
      >
        <div className="px-1">{icon}</div>
        <div className="text-sm md:text-base">{title}</div>
      </button>
    </div>
  );
};

export default NavMenuItem;
