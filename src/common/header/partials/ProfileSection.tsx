import { User } from 'lucide-react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';

const ProfileSection = () => {
  return (
    <div className="flex items-center gap-2 bg-primary-100 p-2 rounded-full w-fit">
      {/* Profile Avatar */}
      <div className="flex justify-center items-center bg-secondary-50 rounded-full w-10 h-10 overflow-hidden">
        <User color="white" size={24} />
      </div>

      {/* Notification Icon */}
      <div className="flex justify-center items-center bg-secondary-50 rounded-full w-10 h-10">
        <IoIosNotificationsOutline className="text-white" size={24} />
      </div>

      {/* Settings Icon */}
      <div className="flex justify-center items-center bg-secondary-50 rounded-full w-10 h-10">
        <IoSettingsOutline className="text-white" size={24} />
      </div>
    </div>
  );
};

export default ProfileSection;
