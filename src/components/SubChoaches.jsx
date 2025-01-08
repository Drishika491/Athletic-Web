import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../index.css";
import { getMenu } from "../service/api";

function SubChoaches() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const result = await getMenu();
      const menuData = result.data.data;
      const homeSubMenus = menuData.find(menu => menu.name === "Coaches").publicSubMenus;
      const activeSubMenus = homeSubMenus.filter(submenu => submenu.isActive);
      setMenuItems(activeSubMenus);
    };
  
    fetchMenuItems();
  }, []);

  const [mobileMenu, setMobileMenu] = useState(false);
  const toggle = () => setMobileMenu(!mobileMenu);
  return (
    <>
      <nav className="relative bg-primary p-3 border-b">
        <div className="w-full mx-auto px-4 flex items-center justify-between">
          <div className="flex flex-col gap-4 hidden lg:flex">
            <div className="flex items-center gap-3">
              <div className="flex justify-between items-center xl:items-end space-x-5">
                <div className="hidden xl:flex items-center space-x-5">
                  {/* Maping menu from API */}
                  {menuItems.map((menuItem) => (
                    <ul className="navbar-sub dropdown p-0" key={menuItem.name}>
                      <li className="border-primary list-none border-b-[2px] hover:border-white cursor-pointer text-white transition-all text-[0.9rem] 2xl:text-[0.9rem] whitespace-nowrap">
                        <NavLink className="nav-bar-link" to={`/coaches/${menuItem.name.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-")}`}>
                          {menuItem.name}
                        </NavLink>
                        
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* <div
            onClick={() => setMobileMenu(!mobileMenu)}
            className="xl:hidden transition-all"
          >
             {mobileMenu ? (
               <XMarkIcon className="h-[2rem] w-auto" />
              ) : (
                <Bars3Icon className="h-[2rem] w-auto" />
              )}
          </div> */}
        </div>

        {/* Mobile Menu  */}
        <div className="w-full mx-auto px-2 lg:hidden overflow-auto touch-auto navscroll flex items-center justify-between">
          <div className="flex flex-col gap-4 flex">
            <div className="flex items-center gap-3">
              <div className="flex justify-between items-center xl:items-end space-x-5">
                <div className="flex items-center space-x-5">
                  {/* Maping menu from API */}
                  {menuItems.map((menuItem) => (
                    <ul className="navbar-sub dropdown p-0" key={menuItem.name}>
                      <li className="hover:border-white list-none border-primary border-b-[2px] cursor-pointer text-white transition-all text-[0.9rem] 2xl:text-[0.9rem] whitespace-nowrap">
                        <NavLink className="nav-bar-link" to={`/coaches/${menuItem.name.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-")}`}>
                          {menuItem.name}
                        </NavLink>
                        
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default SubChoaches;
