import React, { useState, useEffect } from "react";

import Icon_Donate from "../assets/ico-donate-saa.png";
import SingaporeLogo from "../assets/logo.jpg";

import { Icon } from "@iconify/react";
import {
  Bars3Icon,
  ChevronDoubleUpIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import SponsorCarousel from "./SponsorCarousel";

import { config, getMenu } from "../../src/service/api";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "../index.css";
import run from "../service/hmac";
import { isAuthenticated, logout } from '../utils/auth';
import axios from "axios";
import { BASE_URL, BASE_URL_ } from '../service/config';

function Navigation() {
  const [menu, setMenu] = useState([]);
  const [dropdownList, setDropdownList] = useState([]);

  const fetchMenu = async () => {
    const result = await getMenu();
    const transformData = result.data.data
      .filter(menu => menu.isActive) // Filter out inactive items
      .map(menu => {
        const subMenus = menu.publicSubMenus.map(subMenu => ({
          name: subMenu.name,
          actionType: subMenu.actionType,
          action: subMenu.action,
          isActive: subMenu.isActive,
        }));
  
        return {
          ...menu,
          link: menu.name === "Home" ? "/" : "/" + menu.name.toLowerCase().replaceAll(" ", "-"),
          publicSubMenus: subMenus,
        };
      });
    setMenu(transformData);
  };
   
  useEffect(() => {
    fetchMenu()
  }, [])

  // Define hoverValue and its setter outside of the handleHover function
  const [hoverValue, setHoverValue] = useState('');

  const handleHover = (event) => {
    const value = event.target.innerHTML.replace("&amp;", "&");
    setHoverValue(value);

    const selectedMenu = menu.find((m) => m.name === value);

    if (selectedMenu && selectedMenu.publicSubMenus) {
      const subMenuNames = selectedMenu.publicSubMenus
        .filter((subMenu) => subMenu.name !== "About Us" && subMenu.isActive)
        .map((subMenu) => {
          if (subMenu.name === "Mission Statement" || subMenu.name === "Vision Statement") {
            return "Mission and Vision";
          } else {
            return subMenu.name;
          }
        })
        .filter((subMenu, index, self) => self.indexOf(subMenu) === index);

      setDropdownList(subMenuNames);
    } else {
      setDropdownList([]);
    }
    // console.log(dropdownList);
  };

  const handleMouseEnter = (event) => {
    setDropdownList([]);
  }
  

  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  const toggle = () => {
    if (mobileMenu) {
      setScrollTop(window.pageYOffset);
    }
    setMobileMenu(!mobileMenu);
  };
  
  // const stickyClass = mobileMenu ? "" : "sticky h-[710px] md:h-[1180px] top-0 z-[999]";
  const stickyClass = mobileMenu ? "" : "sticky top-0 z-[9999]";
  // const [showDropdown, setShowDropdown] = useState(false);

  const [activeMenu, setActiveMenu] = useState(null);

  const handleActiveMenu = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
  };

  const [showSubMenu, setShowSubMenu] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  const hideSubMenu = () => {
    setShowSubMenu(false);
  };

  const [query, setQuery] = useState('');
  const history = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    history({
      pathname: '/search',
      search: `query=${query}`,
    });
    
  }
  
  const handleLogout = () => {
    logout(); // Call the logout function from auth.js
    // Perform any additional logout-related operations if needed
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false); // Menutup dropdown saat "Profile" diklik
  };

  const [donateIcon, setDonateIcon] = useState([]);

  const fetchDonateIcon = async () => {
    try {
      const result = await axios.get(BASE_URL+'Api/Setting/GetDonate', {
        headers: await config()
      });
      setDonateIcon(result.data.data);
    } catch (error) {
      console.error('Fetch donate icon error:', error);
    }
  }

  useEffect(() => {
    fetchDonateIcon();
  }, []);
  
  return (
    <>
      <div className={`${stickyClass}`}>
        <nav className="relative lg:p-3 border-b bg-white">
          <div className="w-full mx-auto px-4 flex items-center justify-between py-2">
            <div className="flex items-center">
              <a href="/">
                <img
                className="h-[3rem] md:h-[5rem] w-auto"
                // className="w-[35%] md:w-[23%] xl:w-[68%]"
                src={SingaporeLogo}
                alt=""
                />
              </a>
            </div>
            <div className="flex flex-col gap-4 hidden lg:flex">
              <div className="hidden xl:flex justify-end items-center space-x-6">
                <div className="pb-4 px-4">
                  {donateIcon.iconUrl ? (
                    <a href={donateIcon.linkUrl} target="_blank">
                      <img className="w-24" src={BASE_URL_+`${donateIcon.iconUrl}`} />
                    </a>
                  ) : (
                    // Tindakan alternatif jika donateIcon.iconUrl adalah null atau undefined
                    <p></p>
                  )}
                </div>
                <div>Our Sponsors</div>
                <div>
                  <SponsorCarousel />
                </div>
                <form onSubmit={handleSearch}>
                  <div className="flex items-center bg-gray-100 p-2 px-3 rounded-md">
                    <input 
                      type="text" 
                      value={query} 
                      onChange={(e) => setQuery(e.target.value)} 
                      placeholder="Site Search"
                      className="bg-transparent outline-none"
                    />
                    <button type="submit">
                      <Icon
                        className="h-[1.5rem] w-auto text-primary"
                        icon="ic:outline-search"
                      />
                    </button>
                  </div>
                </form>
                {/* <div className="flex items-center bg-gray-100 p-2 px-3 rounded-md">
                  <input
                    placeholder="Site Search"
                    className="bg-transparent outline-none"
                  />
                  <Icon
                    className="h-[1.5rem] w-auto text-primary"
                    icon="ic:outline-search"
                  />
                </div> */}
                {/* <div>
                  <a href="https://www.giving.sg/manage-campaigns?orgId=62120296" target="_blank">
                    <img className="w-24" src={Icon_Donate} />
                  </a>
                </div> */}
                {/* <Link to='/register'>
                  <div className="cursor-pointer flex items-center space-x-3 p-1 bg-gray-100 rounded-md px-3">
                    <div>Register</div>
                    <Icon
                      className="h-[2rem] w-auto text-primary"
                      icon="material-symbols:edit-note"
                    />
                  </div>
                </Link>
                <Link to='/login'>
                  <div className="cursor-pointer flex items-center space-x-3 p-2 bg-gray-100 rounded-md px-3">
                    <div>Login</div>
                    <Icon
                      className="h-[1.5rem] w-auto text-primary"
                      icon="mdi:location-enter"
                    />
                  </div>
                </Link>
                <div className="cursor-pointer flex items-center space-x-3 p-1 bg-gray-100 rounded-md px-3">
                  <div>Profile</div>
                  <Icon
                    className="h-[2rem] w-auto text-primary"
                      icon="gg:profile"
                  />
                </div> */}
                {/* comment by amar
                 */}
                {!isAuthenticated() && (
                  <Link to="/register">
                    <div className="cursor-pointer flex items-center space-x-3 p-1 bg-gray-100 rounded-md px-3">
                      <div>Register</div>
                      <Icon
                      className="h-[2rem] w-auto text-primary"
                      icon="material-symbols:edit-note"
                      />
                    </div>
                  </Link>
                )}
                {!isAuthenticated() && (
                  <Link to="/login">
                    <div className="cursor-pointer flex items-center space-x-3 p-2 bg-gray-100 rounded-md px-3">
                      <div>Login</div>
                      <Icon
                      className="h-[1.5rem] w-auto text-primary"
                      icon="mdi:location-enter"
                      />
                    </div>
                  </Link>
                )}
                {isAuthenticated() && (
                  <div className="relative">
                    <div
                      className="cursor-pointer flex items-center space-x-3 p-1 bg-gray-100 rounded-md px-3"
                      onClick={toggleDropdown}
                    >
                      <div>Account</div>
                      <Icon
                        className="h-[2rem] w-auto text-primary"
                        icon="gg:profile" 
                      />
                    </div>
                    {isDropdownOpen && (
                      <div className="absolute top-10 right-0 bg-white border border-gray-300 rounded-md p-2">
                        <Link to="/account/profile" onClick={handleProfileClick} className="block">Profile</Link>
                        <button onClick={handleLogout} className="block">Log out</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex justify-between items-center xl:items-end space-x-5">
                  <div className="hidden xl:flex items-center space-x-11">
                    {/* Maping menu from API */}
                    {menu.map((menuItem) => (
                      <ul className="navbar dropdown p-0" key={menuItem.pvid}>
                        <li className="list-none border-white border-b-[2px] hover:border-primary cursor-pointer transition-all text-[0.9rem] 2xl:text-[1rem] whitespace-nowrap">
                          {menuItem.name === "Home" ? (
                            <NavLink className="nav-bar-link" to="/" exact>
                              {menuItem.name}
                            </NavLink>
                          ) : (
                            <NavLink className="nav-bar-link" to={menuItem.link} onMouseEnter={handleHover}>
                              {menuItem.name}
                            </NavLink>
                          )}
                          {menuItem.name !== "Home" && menuItem.name !== "Latest News" && menuItem.name !== "Kids Athletics" && dropdownList.length > 0 && (
                            <div className="relative">
                              <ul className={`p-0 dropdown-menu hidden absolute text-gray-700 pt-3 z-50 origin-top-right max-w-screen ${menuItem.name === 'Get Involved' ? 'right-0' : ''}`}
                                onMouseOver={(event) => {
                                  // Cek apakah menu yang dihover adalah "Get Involved"
                                  const menuItem = event.currentTarget.parentNode?.firstChild;
                                  const isGetInvolved = menuItem?.innerHTML === "Get Involved";
                                  if (isGetInvolved) {
                                    // Jika ya, tambahkan kelas right-0 pada elemen dropdown menu
                                    event.currentTarget.classList.add("right-0");
                                  }
                                }}
                                onMouseLeave={(event) => {
                                  // Cek apakah menu yang dihover adalah "Get Involved"
                                  const menuItem = event.currentTarget.parentNode?.firstChild;
                                  const isGetInvolved = menuItem?.innerHTML === "Get Involved";
                                  if (isGetInvolved) {
                                    // Jika ya, hapus kelas right-0 pada elemen dropdown menu
                                    event.currentTarget.classList.remove("right-0");
                                  }
                                }}
                              >
                                {dropdownList.map((item) => {
                                  // Check if the subMenu.actionType is "content"
                                  const displayItem = item === "Corporate Sponsors" ? "Corporate Partners" : item;
                                  const selectedMenu = menu.find((m) => m.name === hoverValue);
                                  const subMenu = selectedMenu && selectedMenu.publicSubMenus.find((subMenu) => subMenu.name === item);

                                  return (
                                    <li key={item} className="list-none bg-white hover:bg-gray-200 border-b-2 py-2 px-4 whitespace-no-wrap">
                                      {subMenu && subMenu.actionType === "link" ? (
                                        <a href={subMenu.action} target="_blank" rel="noopener noreferrer">
                                          {displayItem}
                                        </a>
                                      ) : (
                                        <NavLink to={subMenu?.actionType === "link" ? subMenu.action : `${menuItem.link}/${item.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-")}`}>
                                          {displayItem}
                                        </NavLink>
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </li>
                      </ul>
                    ))}

                    {/* {showDropdown && (
                      <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                        <div className="py-1" role="none">
                        {menu.map(menu => (
                          <ul className="navbar" key={menu.pvid}>
                            <li className="border-white border-b-[2px] hover:border-primary cursor-pointer transition-all pb-1 text-[0.9rem] 2xl:text-[1rem] whitespace-nowrap">
                              <NavLink className="nav-bar-link" to={menu.link} >
                                {menu.name}
                              </NavLink>
                            </li>
                          </ul>
                        ))}
                        </div>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={() => {
                toggle();
                scrollToTop();
              }}
              className="xl:hidden transition-all"
            >
              {mobileMenu ? (
                <XMarkIcon className="h-[2rem] w-auto" />
              ) : (
                <Bars3Icon className="h-[2rem] w-auto" />
              )}
            </div>
          </div>

          {/* Mobile Menu  */}
          <div
            className={`${
              mobileMenu ? "" : "hidden" 
            } transition-all top-[100%] absolute left-0 w-full z-[9999] mobile-menu`}
          >
            <div className="flex items-center">
              {!isAuthenticated() && (
                // <Link to="/register">
                  <div className="text-[1.2rem] w-full p-5 text-center bg-primary text-white">
                    <Link to='/register' onClick={() => {setActiveIndex(activeIndex === index ? null : index); setMobileMenu(false);}}>
                      Sign Up
                    </Link>
                  </div>
                // </Link>
              )}
              {!isAuthenticated() && (
                // <Link to="/login">
                  <div className="text-[1.2rem] w-full p-5 text-center bg-secondary text-white">
                    <Link to='/login' onClick={() => {setActiveIndex(activeIndex === index ? null : index); setMobileMenu(false);}}>
                      Sign In
                    </Link>
                  </div>
                // </Link>
              )}
            </div>
            <div className="flex justify-center items-center bg-gray-100">
              {isAuthenticated() && (
                <div className="relative">
                  <div
                    className="cursor-pointer w-full flex items-center space-x-3 p-1 bg-gray-100 rounded-md px-3"
                    onClick={toggleDropdown}
                  >
                    <div>Account</div>
                    <Icon
                      className="h-[2rem] w-auto text-primary"
                      icon="gg:profile"
                    />
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute top-10 right-0 bg-white border border-gray-300 rounded-md p-2">
                      <Link to="/profile" className="block">Profile</Link>
                      <button onClick={handleLogout} className="block">Log out</button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col bg-[#262626] text-white">
              <div>
                {/* Maping menu from API */}
                <ul className="p-0">
                {menu.map((menu, index) => {
                  let isMissionVisionDisplayed = false;
                  return (
                    <React.Fragment key={index}>
                      {menu.name === "Home" ? (
                        <li className="py-4 text-[1.2rem] border-b list-none">
                          <Link to="/" onClick={() => {setActiveIndex(activeIndex === index ? null : index); setMobileMenu(false);}} className="px-4 py-4">
                            {menu.name}
                          </Link>
                        </li>
                      ) : (
                        <li className="py-4 text-[1.2rem] border-b list-none">
                          {menu.name === "Latest News" ? (
                            <Link to="/latest-news/" onClick={() => {setActiveIndex(activeIndex === index ? null : index); setMobileMenu(false);}} className="px-4 py-4">
                              {menu.name}
                            </Link>
                          ) : (
                            menu.name === "Kids Athletics" ? (
                              <Link to="/kids-athletics" onClick={() => {setActiveIndex(activeIndex === index ? null : index); setMobileMenu(false);}} className="px-4 py-4">
                                {menu.name}
                              </Link>
                            ) : (
                              menu.name === "Coaches" ? (
                              <Link to="/coaches/sa-coach-registry" onClick={() => {setActiveIndex(activeIndex === index ? null : index); setMobileMenu(false);}} className="px-4 py-4">
                                {menu.name}
                              </Link>
                            ) : (
                              menu.name === "Technical Officials" ? (
                                <Link to="/technical-officials/sa-technical-official-registry" onClick={() => {setActiveIndex(activeIndex === index ? null : index); setMobileMenu(false);}} className="px-4 py-4">
                                  {menu.name}
                                </Link>
                              ) : (
                              <a href="#" onClick={() => setActiveIndex(activeIndex === index ? null : index)} className="px-4 py-4">
                                {menu.name}
                              </a>
                            )
                          )))}
                        </li>
                      )}
                      {activeIndex === index && menu.publicSubMenus && menu.name !== "Home" && menu.name !== "Latest News" && menu.name !== "Kids Athletics" && (
                        <ul className="bg-white px-4 text-black">
                          {menu.publicSubMenus
                          .filter((subMenu) => subMenu.isActive)
                          .map((subMenu, subIndex) => {
                            if (
                              (subMenu.name === "Mission Statement" ||
                                subMenu.name === "Vision Statement") &&
                              isMissionVisionDisplayed
                            ) {
                              return null;
                            }
                            if (subMenu.name === "Mission Statement" || subMenu.name === "Vision Statement") {
                              isMissionVisionDisplayed = true;
                            }
                            return (
                              <li
                                className="py-4 text-[1.2rem] border-b border-gray-600 list-none"
                                key={subIndex}
                              >
                                {subMenu.actionType === "link" ? (
                                  <Link to={subMenu.action} target="_blank" rel="noopener noreferrer"
                                    onClick={() => {
                                      setActiveIndex(activeIndex === index ? null : index);
                                      setMobileMenu(false);
                                    }}
                                  >
                                    {subMenu.name === "Mission Statement" || subMenu.name === "Vision Statement"
                                      ? "Mission and Vision"
                                      : subMenu.name}
                                  </Link>
                                ) : (
                                  <Link
                                    to={
                                      subMenu.name === "Mission Statement" || subMenu.name === "Vision Statement"
                                        ? `${menu.link}/mission-and-vision`
                                        : subMenu.name === "About Us"
                                        ? "/about-us"
                                        : `${menu.link}/${subMenu.name.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-")}`
                                    }
                                    onClick={() => {
                                      setActiveIndex(activeIndex === index ? null : index);
                                      setMobileMenu(false);
                                    }}
                                  >
                                    {subMenu.name === "Mission Statement" || subMenu.name === "Vision Statement"
                                      ? "Mission and Vision"
                                      : subMenu.name}
                                  </Link>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </React.Fragment>
                  );
                })}
                </ul>
              </div>
              <div className="p-4">
                <form onSubmit={handleSearch}>
                  <div className="flex items-center space-x-5 w-full bg-white p-2 px-3">
                    <input
                      placeholder="Site Search"
                      className="outline-none flex-1 text-black"
                      value={query} 
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" onClick={() => setMobileMenu()}>
                      <MagnifyingGlassIcon className="h-[1.5rem] w-auto text-primary" />
                    </button>
                  </div>
                </form>
                <div
                  onClick={() => setMobileMenu()}
                  className="flex justify-center mt-5"
                >
                  <ChevronDoubleUpIcon className="h-[2rem] w-auto" />
                </div>
              </div>
            </div>
          </div>
        </nav>
        
        <div className="flex xl:hidden items-center bg-white w-full justify-end p-2 space-x-4">
          <div className="pb-0">
            <a href="https://www.giving.sg/manage-campaigns?orgId=62120296" target="_blank">
              <img className="w-16 md:w-20" src={Icon_Donate} />
            </a>
          </div>
          <div className="text-[0.8rem] whitespace-nowrap">
            Our Sponsors
          </div>
          <div>
            <SponsorCarousel />
          </div>
        </div>

        <div className="h-[20px] bg-secondary"></div>
      </div>
    </>
  );
}

export default Navigation;

// run('GET')