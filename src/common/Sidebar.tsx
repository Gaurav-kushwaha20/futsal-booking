import { mainMenuItems, userMenuItems } from '@/data/sidebar.data';
import { MenuItem } from '@/interface/sidebar.interface';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoChevronDownOutline, IoChevronForward } from 'react-icons/io5';

const Sidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
   const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
   const [hoveredParenId, setHoveredParentId] = useState<string | null>(null);
   const [hoveredChildId, setHoveredChildId] = useState<string | null>(null);
   const [activeParentId, setActiveParentId] = useState<string | null>(null);

   const toggleDropdown = (id: string) => {
      setOpenDropdowns(prev =>
         prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
   };

   const renderMenuItems = (items: MenuItem[], level: number = 0): React.JSX.Element => {
      const children = items.map((item, index) => {
         const isOpen = openDropdowns.includes(item.id);
         const hasChildren = item.children && item.children.length > 0;
         const isHoveredParent = hoveredParenId === item.id;
         const isActive = activeParentId === item.id;

         return (
            <div
               key={index}
               className="relative"
               onMouseEnter={() => {
                  if (!isSidebarOpen && hasChildren) {
                     setHoveredParentId(item.id);
                  }
               }}
               onMouseLeave={() => {
                  if (!isSidebarOpen && hasChildren) {
                     setHoveredParentId(null);
                     setHoveredChildId(null);
                  }
               }}
            >
               <Link
                  href={item.link ?? '#'}
                  className={`flex items-center justify-between px-3 ${level === 0 || level === 1 ? 'py-3 mb-1' : 'py-2'
                     } rounded-xl cursor-pointer transition-colors ${isActive
                        ? 'bg-purple-200 text-secondary-500'
                        : 'text-secondary-500 hover:bg-secondary-50'
                     }`}
                  onClick={() =>
                     (hasChildren && isSidebarOpen && toggleDropdown(item.id)) ||
                     setActiveParentId(item.id)
                  }
                  style={{ paddingLeft: `${level * 16 + 12}px` }}
               >
                  <div className="flex items-center gap-3">
                     {item.icon && <item.icon className="w-5 h-5" />}
                     <span
                        className={`font-[400] text-text-main text-sm ${isSidebarOpen ? 'block' : 'hidden'
                           }`}
                     >
                        {item.label}
                     </span>
                  </div>
                  {hasChildren && isSidebarOpen && (
                     <span className="text-xs">
                        {isOpen ? <IoChevronDownOutline size={16} /> : <IoChevronForward size={16} />}
                     </span>
                  )}
               </Link>

               {hasChildren && isSidebarOpen && isOpen && (
                  <div className={`${level === 0 ? 'space-y-1' : 'space-y-1'}`}>
                     {renderMenuItems(item.children!, level + 1)}
                  </div>
               )}

               {!isSidebarOpen && hasChildren && isHoveredParent && (
                  <div className="top-0 left-full z-50 absolute bg-white shadow-lg mb-1 -ml-[0.9px] px-2 py-2 rounded-lg w-36">
                     {item.children!.map((child, idx) => {
                        const isHoveredChild = hoveredChildId === child.id;

                        return (
                           <div
                              key={idx}
                              className="group relative"
                              onMouseEnter={() => {
                                 if (child.children?.length) {
                                    setHoveredChildId(child.id);
                                 }
                              }}
                              onMouseLeave={() => {
                                 if (child.children?.length) {
                                    setHoveredChildId(null);
                                 }
                              }}
                           >
                              <div className="flex justify-between items-center hover:bg-secondary-50 px-4 py-2 font-[400] text-text-primary text-sm cursor-pointer">
                                 <span>{child.label}</span>
                                 {(child.children?.length ?? 0) > 0 && (
                                    <IoChevronForward size={14} className="opacity-70" />
                                 )}
                              </div>

                              {(child.children?.length ?? 0) > 0 && isHoveredChild && (
                                 <div className="top-0 left-full z-50 absolute bg-white shadow-lg ml-[0.6] py-2 rounded-lg w-48">
                                    {child?.children?.map((nestedChild, nestedIdx) => (
                                       <Link href={nestedChild.link ?? '#'} key={nestedIdx}>
                                          <div className="hover:bg-secondary-50 px-4 py-2 font-[400] text-text-main text-sm cursor-pointer">
                                             <span>{nestedChild.label}</span>
                                          </div>
                                       </Link>
                                    ))}
                                 </div>
                              )}
                           </div>
                        );
                     })}
                  </div>
               )}
            </div>
         );
      });

      return level === 0 ? <div className="space-y-2">{children}</div> : <>{children}</>;
   };

   return (
      <div
         className={`relative bg-white p-4 pt-4 h-full font-medium no-scrollbar transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'
            } ${isSidebarOpen ? 'overflow-y-scroll' : ''}`}
      >
         <div className="mb-3">{renderMenuItems(mainMenuItems)}</div>
         {isSidebarOpen ? <div className="bg-gray-300 w-full h-px"></div> : ''}
         <div>
            <h3 className="mt-3 mb-3 px-3 font-[500] text-heading text-xs">User</h3>
            <div className="space-y-2">
               {/* Assuming you have a userMenuItems similar to mainMenuItems, you must update that too to use IconType */}
               {userMenuItems.map((item, index) => (
                  <div
                     key={index}
                     className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors ${item.active
                        ? 'bg-purple-200 text-secondary-500'
                        : 'text-secondary-500 hover:bg-secondary-50'
                        }`}
                  >
                     {item.icon && <item.icon className="w-5 h-5" />}
                     <span
                        className={`font-[400] text-text-main text-sm ${isSidebarOpen ? 'block' : 'hidden'
                           }`}
                     >
                        {item.label}
                     </span>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Sidebar;
