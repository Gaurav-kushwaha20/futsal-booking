import LogoSection from './partials/LogoSection';
import ProfileSection from './partials/ProfileSection';
import { IoIosMenu } from 'react-icons/io';

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="flex justify-between items-center bg-[#2F234F] shadow px-6 py-[8px] w-full">
      <div className="flex items-center gap-22">
        <LogoSection />
        <div className="flex justify-center items-center">
          <div
            onClick={toggleSidebar}
            className="flex justify-center items-center bg-[#EDE7F6] py-2 rounded-lg w-8 h-8 cursor-pointer"
          >
            <IoIosMenu size={20} color="#5E35B1" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ProfileSection />
      </div>
    </header>
  );
};

export default Header;
