import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../index.css";
import { getMenu } from "../service/api";

function SubHighPerformance() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const result = await getMenu();
      const menuData = result.data.data;
      const homeSubMenus = menuData.find(menu => menu.name === "High Performance").publicSubMenus;
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
        <div className="hidden lg:flex mx-auto px-4">
          <ul className="flex flex-wrap items-center gap-5 navbar-sub dropdown p-0">
            {menuItems.map((item) => {
              let navLinkPath = item.actionType === 'link'
                ? item.action // Jika actionType adalah 'link', gunakan nilai dari item.action
                : `/high-performance/${item.name.toLowerCase().replaceAll(" ", "-")}`;

              return (
                <li
                  className="border-primary list-none border-b-[2px] hover:border-white cursor-pointer text-white transition-all text-[0.9rem] 2xl:text-[0.9rem] whitespace-nowrap"
                  key={item.name}
                >
                  <NavLink className="nav-bar-link" to={navLinkPath} target={item.actionType === 'link' ? '_blank' : null}>
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
            {/* {menuItems.length > 9 && <NavDropdown menuItems={menuItems.slice(9)} />} */}

          </ul>
        </div>

        {/* Mobile Menu  */}
        <div className="w-full mx-auto px-2 lg:hidden overflow-auto touch-auto navscroll flex items-center justify-between">
          <div className="flex flex-col gap-4 flex">
            <div className="flex items-center gap-3">
              <div className="flex justify-between items-center xl:items-end space-x-5">
                <div className="flex items-center space-x-5">
                  {/* Maping menu from API */}
                  {menuItems.map((menuItem) => {
                    let navLinkPath = menuItem.actionType === 'link'
                      ? menuItem.action // Jika actionType adalah 'link', gunakan nilai dari menuItem.action
                      : `/high-performance/${menuItem.name.toLowerCase().replaceAll(" ", "-")}`;

                    return (
                      <ul className="navbar-sub dropdown p-0" key={menuItem.name}>
                        <li className="hover:border-white list-none border-primary border-b-[2px] cursor-pointer text-white transition-all text-[0.9rem] 2xl:text-[0.9rem] whitespace-nowrap">
                          <NavLink className="nav-bar-link" to={navLinkPath} target={menuItem.actionType === 'link' ? '_blank' : null}>
                            {menuItem.name}
                          </NavLink>
                        </li>
                      </ul>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default SubHighPerformance;
