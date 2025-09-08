import { IoSettingsOutline } from "react-icons/io5";

const ProfileSection = () => {
  return (
    <div className="flex items-center gap-1 bg-primary-100 p-1 rounded-full w-fit">
      {/* Profile Avatar */}
      <div className="rounded-full w-12 h-10 overflow-hidden">
        <img
          src={
            "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
          }
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Settings Icon */}
      <div className="flex justify-center items-center rounded-full w-10 h-10">
        <IoSettingsOutline className="w-7 h-7 text-primary-500" />
      </div>
    </div>
  );
};

export default ProfileSection;
