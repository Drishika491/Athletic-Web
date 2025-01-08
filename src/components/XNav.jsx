// import { ChevronDownIcon } from '@heroicons/react/24/solid';
// import React, { useState } from 'react';
// // import { ChevronDownIcon } from '@heroicons/react/solid';

// function DropdownMenu() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="relative inline-block text-left">
//       <div>
//         <button
//           type="button"
//           className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           id="menu-button"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           Dropdown menu
//           <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
//         </button>
//       </div>

//       {isOpen && (
//         <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
//           <div className="py-1" role="none">
//             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="menu-item-0">
//               Menu item 1
//             </a>
//             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="menu-item-1">
//               Menu item 2
//             </a>
//             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="menu-item-2">
//               Menu item 3
//             </a>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default DropdownMenu;

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

function DropdownMenu() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onMouseEnter={() => setShowDropdown(!showDropdown)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        Dropdown menu
        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </button>

      {showDropdown && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
          <div className="py-1" role="none">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="menu-item-0">
              Menu item 1
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="menu-item-1">
              Menu item 2
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="menu-item-2">
              Menu item 3
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function Menu() {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white border-b border-gray-200 sm:px-6">
      <div className="flex">
        <a href="#" className="px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-50">Menu 1</a>
        <a href="#" className="px-3 py-2 text-sm font-medium text-gray-500 rounded-md hover:bg-gray-50">Menu 2</a>
        <DropdownMenu />
        <a href="#" className="px-3 py-2 text-sm font-medium text-gray-500 rounded-md hover:bg-gray-50">Menu 4</a>
      </div>
      <div className="hidden md:block">
        <a href="#" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200">Action button</a>
      </div>
    </div>
  );
}

export default Menu;
