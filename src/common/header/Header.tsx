import { IoIosMenu } from "react-icons/io";
import LogoSection from "./partials/LogoSection";
import NotificationSection from "./partials/NotificationSection";
import ProfileSection from "./partials/ProfileSection";
import React from "react";
import Link from "next/link";
import { INavitems } from "./headerData";

interface IProps {
  toggleSidebar?: () => void
  navitems?: INavitems[]
}


const Header: React.FC<IProps> = (props) => {
  return (
    <header className="flex justify-between items-center bg-primary-500 shadow px-6 py-2 w-full">
      <div className="h-full flex items-center gap-22">
        <LogoSection />
        {
          props.toggleSidebar && <div className="flex justify-center items-center">
            <button
              onClick={props.toggleSidebar}
              className="flex justify-center items-center bg-[#EDE7F6] py-2 rounded-lg w-8 h-8 cursor-pointer"
            >
              <IoIosMenu size={20} color="#5E35B1" />
            </button>
          </div>
        }

        <div className="h-full flex items-center gap-6 rounded-xl bg-white px-6">
          {props?.navitems && props?.navitems?.length > 0 &&
            props.navitems.map((item) => (
              <Link
                key={item?.link}
                href={item?.link}
                className="text-gray-700 transition-colors duration-200 hover:text-secondary-600"
              >
                {item?.label}
              </Link>
            ))}
        </div>

      </div>
      <div className="flex items-center gap-4">
        <NotificationSection />
        <ProfileSection />
      </div>
    </header>
  );
};

export default Header;
