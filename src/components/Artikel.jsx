import { useState } from "react";

const menuItems = [
  {name: "Mission Statement", link: "/about-us/mission-statement" },
  {name: "Vision Statement", link: "/about-us/vision-statement" },
  {name: "SA Constitution", link: "/about-us/sa-constitution" },
  {name: "Board and Sub-Committees", link: "/about-us/board-and-sub-committees" },
  {name: "Secretariat Staff", link: "/about-us/secretariat-staff" },
  {name: "Athletes Commission", link: "/about-us/athletes-commission" },
  {name: "Affiliate Members", link: "/about-us/affiliate-members" },
  {name: "Policies", link: "/about-us/policies" },
  {name: "Safe Sport", link: "/about-us/safe-sport" },
  {name: "Corporate Partners", link: "/about-us/corporate-sponsors" },
  {name: "Latest News", link: "/about-us/latest-news" },
  {name: "Annual General Meeting", link: "/about-us/annual-general-meeting" },
  {name: "Getting to SA Office", link: "/about-us/getting-to-sa-office" },
];

function NavDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownItems = menuItems.slice(8);
  
  return (
    <div className="relative">
      <button
        className="text-white hover:text-gray-300 focus:text-gray-300"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        More <i className="fas fa-chevron-down"></i>
      </button>
      {isDropdownOpen && (
        <ul className="absolute top-full right-0 dropdown-test bg-white py-2 rounded-md shadow-md z-10">
          {dropdownItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.link}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function NavMenu() {
  return (
    <>
      {menuItems.slice(0, 8).map((item) => (
        <li key={item.name}>
          <a
            href={item.link}
            className="text-white hover:text-gray-300 focus:text-gray-300"
          >
            {item.name}
          </a>
        </li>
      ))}
      {menuItems.length > 8 && <NavDropdown />}
    </>
  );
}

export default function Navbar() {
  return (
    <nav className="bg-gray-900 py-4">
      <div className="container mx-auto px-4">
        <ul className="flex items-center justify-between">
          <li>
            <ul className="flex items-center gap-8">
              <NavMenu />
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

