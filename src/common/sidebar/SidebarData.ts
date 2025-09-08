import {
 IoHomeOutline, // Dashboard
} from 'react-icons/io5';
import type { IconType } from 'react-icons';
import { PATH } from '@/constant/PATH.constant';

interface UserMenuItem {
 id: string;
 icon?: IconType;
 label: string;
 active?: boolean;
 link?: string;
}
export const mainMenuItems = [
 {
  id: 'dashboard',
  icon: IoHomeOutline,
  label: 'Dashboard',
  active: false,
  link: PATH.dashboard,
 },
];
