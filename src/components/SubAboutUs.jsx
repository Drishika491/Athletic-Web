import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../index.css";
import { getMenu } from "../service/api";

function NavDropdown({ menuItems }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="border-primary border-b-[2px] hover:border-white cursor-pointer text-white transition-all text-[0.9rem] 2xl:text-[0.9rem] whitespace-nowrap"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        More
      </button>
      {isDropdownOpen && (
        <ul className="absolute top-full right-0 dropdown-test bg-white py-2 rounded-md shadow-md z-10">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={`/about-us/${item.name.toLowerCase().replaceAll(" ", "-")}`}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 nav-bar-link"
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SubAboutUs() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const result = await getMenu();
      const menuData = result.data.data;
      const homeSubMenus = menuData.find(menu => menu.name === "About Us").publicSubMenus;
  
      // Menggabungkan "Mission Statement" dan "Vision Statement" menjadi "Mission and Vision"
      const activeSubMenus = homeSubMenus.reduce((acc, cur) => {
        if (cur.isActive && (cur.name === "Mission Statement" || cur.name === "Vision Statement")) {
          // Mengecek apakah "Mission and Vision" sudah ada dalam array acc
          const isMissionAndVisionExist = acc.some(item => item.name === "Mission and Vision");
  
          if (!isMissionAndVisionExist) {
            acc.push({ ...cur, name: "Mission and Vision" });
          }
        } else if (cur.isActive) {
          acc.push(cur);
        }
        return acc;
      }, []);
  
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
            {/* {menuItems.slice(0, 9).map((item) => (
              <li
                className="border-primary border-b-[2px] hover:border-white cursor-pointer text-white transition-all text-[0.9rem] 2xl:text-[0.9rem] whitespace-nowrap"
                key={item.name}
              >
                <NavLink className="nav-bar-link" to={`/about-us/${item.name.toLowerCase().replaceAll(" ", "-")}`}>
                  {item.name}
                </NavLink>
              </li>
            ))} */}
            {menuItems.map((item) => (
              <React.Fragment key={item.name}>
                {item.name === "About Us" ? (
                  null // menyembunyikan "About Us"
                ) : (
                  <li
                    className="border-primary list-none border-b-[2px] hover:border-white cursor-pointer text-white transition-all text-[0.9rem] 2xl:text-[0.9rem] whitespace-nowrap"
                    key={item.name}
                  >
                    <NavLink className="nav-bar-link" to={`/about-us/${item.name.toLowerCase().replaceAll(" ", "-")}`}>
                      {item.name === "Corporate Sponsors" ? "Corporate Partners" : item.name}
                    </NavLink>
                  </li>
                )}
              </React.Fragment>
            ))}

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
                  {menuItems.map((menuItem) => (
                    menuItem.name !== "About Us" &&
                    <ul className="navbar-sub dropdown p-0" key={menuItem.name}>
                      <li className="hover:border-white list-none border-primary border-b-[2px] cursor-pointer text-white transition-all text-[0.9rem] 2xl:text-[0.9rem] whitespace-nowrap">
                        <NavLink className="nav-bar-link" to={`/about-us/${menuItem.name.toLowerCase().replaceAll(" ", "-")}`}>
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

export default SubAboutUs;
