import { PATH } from '@/constant/PATH.constant';

export interface INavitems {
 label: string;
 link: string;
}

export const navItems: INavitems[] = [
 {
  label: 'Home',
  link: PATH.user.home,
 },
 {
  label: 'Futsal',
  link: PATH.user.home,
 },
];
