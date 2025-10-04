import { PATH } from "@/constant/PATH.constant";
import { userManager } from "@/lib/oidc-client";
import { useClickOutside } from "@/lib/useClickOutside";
import { openOwnerLoginModal } from "@/store/slices/ownerLoginModalSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { IoSettingsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const ProfileSection = () => {
  const profileMenu = useClickOutside()
  const router = useRouter();
  const profile = useSelector((state: RootState) => state.auth.user?.profilePicture)
  const dispatch = useDispatch();

  const handleSignInUser = () => {
    userManager.signinRedirect();
  }

  const handleSignIOwner = () => {
    router.push(PATH.owner.dashboard);
    dispatch(openOwnerLoginModal())
  }
  const handleLogout = () => {
    userManager.signoutRedirect({
      post_logout_redirect_uri: "http://localhost:3000"
    })
  }
  return (
    <div className="flex items-center gap-1 bg-primary-100 p-1 rounded-full w-fit">
      {/* Profile Avatar */}
      <div className="rounded-full w-12 h-10 overflow-hidden">
        <img
          src={profile || '/profile.png'}
          alt="Profile"
          className="w-full h-full object-cover hover-scale-125"
        />
      </div>

      {/* Settings Icon */}
      <div ref={profileMenu.ref} className="relative flex justify-center items-center rounded-full w-10 h-10">
        <IoSettingsOutline onClick={profileMenu.modalState.toggle} className="w-7 h-7 hover-scale-125 text-primary-500" />

        {profileMenu.modalState.isOpen && <div className="absolute z-20 top-12 right-0">
          <ul className="bg-white shadow-lg rounded-lg w-48 py-2 text-gray-700">
            <li onClick={handleSignInUser} className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer rounded-md transition">
              Sign In as User
            </li>
            <li onClick={handleSignIOwner} className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer rounded-md transition">
              Sign In as Owner
            </li>
            <li onClick={handleLogout} className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer rounded-md transition">
              Log out
            </li>
          </ul>
        </div>}

      </div>

    </div>
  );
};

export default ProfileSection;
