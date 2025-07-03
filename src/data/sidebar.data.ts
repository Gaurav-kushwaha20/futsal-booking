import {
 IoHomeOutline, // Dashboard
} from "react-icons/io5";
import { IoPersonCircleOutline, IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import type { IconType } from "react-icons";
import { PATH } from "@/constant/PATH.constant";

interface UserMenuItem {
 id: string;
 icon?: IconType;
 label: string;
 active?: boolean;
 link?: string;
}
export const mainMenuItems = [
 {
  id: "dashboard",
  icon: IoHomeOutline,
  label: "Dashboard",
  active: false,
  link: PATH.owner.dashboard,
 },
 {
  id: "futsals",
  icon: IoHomeOutline,
  label: "Futsals",
  active: false,
  link: PATH.owner.futsals,
 },
];

export const userMenuItems: UserMenuItem[] = [
 {
  id: "profile",
  icon: IoPersonCircleOutline,
  label: "Profile",
  active: false,
  link: "/profile",
 },
 {
  id: "settings",
  icon: IoSettingsOutline,
  label: "Settings",
  active: false,
  link: "/settings",
 },
 {
  id: "logout",
  icon: IoLogOutOutline,
  label: "Logout",
  active: false,
  link: "/logout",
 },
];
