import type { IconType } from "react-icons";

// Define MenuItem interface with IconType for icon prop
export interface MenuItem {
 id: string;
 icon?: IconType;
 link?: string;
 label: string;
 active?: boolean;
 children?: MenuItem[];
 showArrow?: boolean;
}
