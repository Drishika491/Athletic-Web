// import React, { useState } from 'react';

// function SubNavigation() {
//   const [menuHover, setMenuHover] = useState([]);

//   function handleMenuHover(value) {
//     setMenuHover(value);
//   }

//   let dropdownContent;

//   if (menuHover === 'About Us') {
//     dropdownContent = <ul className="dropdown-menu absolute text-gray-700 pt-3">
//     <li className=""><a className="rounded-t bg-white hover:bg-gray-200 border-b-2 py-2 px-4 block whitespace-no-wrap" href="#">One</a></li>
//     <li className=""><a className="bg-white hover:bg-gray-200 border-b-2 py-2 px-4 block whitespace-no-wrap" href="#">Two</a></li>
//     <li className=""><a className="rounded-b bg-white hover:bg-gray-200 border-b-2 py-2 px-4 block whitespace-no-wrap" href="#">Three is the magic number</a></li>
//   </ul>;
//   } else if (menuHover === 'Event') {
//     dropdownContent = <div className="Event">Ini adalah konten dropdown Event</div>;
//   }

//   return (
//     <div>
//       <nav>
//         <ul>
//           <li onMouseEnter={() => handleMenuHover('About Us')} onMouseLeave={() => handleMenuHover('')}>
//             <a href="#">About Us</a>
//             {menuHover === 'About Us' && (
//               <div className="Dropdown text-gray-700 pt-3">{dropdownContent}</div>
//             //   <ul className='dropdown-menu absolute hidden text-gray-700 pt-3'>{dropdownContent}</ul>
//             )}
//           </li>
//           <li onMouseEnter={() => handleMenuHover('Event')} onMouseLeave={() => handleMenuHover('')}>
//             <a href="#">Event</a>
//             {menuHover === 'Event' && (
//               <div className="Dropdown">{dropdownContent}</div>
//             )}
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default SubNavigation;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function DropdownMenu({ hoverNavLink, menuItems }) {
  // menentukan item dropdown berdasarkan NavLink yang di-hover
  let dropdownContent = null;
  if (hoverNavLink === "About Us") {
    dropdownContent = (
      <>
        <li className="dropdown-item">Tentang Kami</li>
        <li className="dropdown-item">Sejarah</li>
      </>
    );
  } else if (hoverNavLink === "Event") {
    dropdownContent = (
      <>
        <li className="dropdown-item">Jadwal</li>
        <li className="dropdown-item">Daftar</li>
      </>
    );
  }

  return (
    <div className="dropdown-menu">
      {dropdownContent}
    </div>
  );
}

function SubNavigation() {
  const [hoverNavLink, setHoverNavLink] = useState("");
  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about-us" },
    { name: "Event", link: "/event" },
  ];

  return (
    <nav className="navbar">
        {menuItems.map((menuItem) => (
            <ul className="nav">
                <li className="nav-item" key={menuItem.name}>
                    <NavLink
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="nav-link"
                    onMouseEnter={() => setHoverNavLink(menuItem.name)}
                    >
                    {menuItem.name}
                    </NavLink>
                </li>
            </ul>
        ))}
      {hoverNavLink && <DropdownMenu hoverNavLink={hoverNavLink} menuItems={menuItems} />}
    </nav>
  );
}

export default SubNavigation;
