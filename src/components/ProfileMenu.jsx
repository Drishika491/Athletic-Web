import { Icon } from "@iconify/react";
import React from "react";
import { NavLink } from "react-router-dom";
function ProfileMenu() {
  const isActive = (paths) =>
    paths.some((path) => window.location.pathname.includes(path));
  const userType = localStorage.getItem("userType");
  return (
    <>
      {/* Mobile View Menu */}
      <div className="bg-gray-200 flex justify-center md:hidden lg:hidden w-full p-4">
        <li className="cursor-pointer p-2 text-[0.9rem] flex items-center">
          <NavLink
            to="/account/profile"
            className={`flex ${
              isActive(["/account/profile"]) ? "text-secondary" : ""
            }`}
          >
            <Icon
              icon="ic:account-circle"
              className="h-[1.2rem] w-auto mr-1"
              style={{
                color: isActive(["/account/profile"]) ? "#8D8963" : "inherit",
              }}
            />
            Profile
          </NavLink>
        </li>
        {userType === "Club" && (
          <li className="cursor-pointer text-[0.9rem] p-2 flex items-center">
            <NavLink
              to="/account/manage-athlete"
              className={`flex ${
                isActive(["/account/manage-athlete"]) ? "text-secondary" : ""
              }`}
            >
              <Icon
                icon="solar:user-id-linear"
                className="h-[1.2rem] w-auto mr-1"
                style={{
                  color: isActive(["/account/manage-athlete"])
                    ? "#8D8963"
                    : "inherit",
                }}
              />
              Athletes
            </NavLink>
          </li>
        )}
        <li className="cursor-pointer text-[0.9rem] p-2 flex items-center">
          <NavLink
            to="/account/security"
            className={`flex ${
              isActive(["/account/security"]) ? "text-secondary" : ""
            }`}
          >
            <Icon
              icon="mdi:shield-account"
              className="h-[1.2rem] w-auto mr-1"
              style={{
                color: isActive(["/account/security"]) ? "#8D8963" : "inherit",
              }}
            />
            Security
          </NavLink>
        </li>
        <li className="cursor-pointer text-[0.9rem] p-2 flex items-center">
          <NavLink
            to="/account/history-payment"
            className={`flex ${
              isActive(["/account/history-payment"]) ? "text-secondary" : ""
            }`}
          >
            <Icon
              icon="ic:credit-card"
              className="h-[1.2rem] w-auto mr-1"
              style={{
                color: isActive(["/account/history-payment"])
                  ? "#8D8963"
                  : "inherit",
              }}
            />
            Transaction
          </NavLink>
        </li>
        <li className="cursor-pointer text-[0.9rem] p-2 flex items-center">
          <NavLink
            to="/account/events"
            className={`flex ${
              isActive([
                "/account/events",
                "/account/events/submit-participant",
              ])
                ? "text-secondary"
                : ""
            }`}
          >
            <Icon
              icon="ic:event"
              className="h-[1.2rem] w-auto mr-1"
              style={{
                color: isActive([
                  "/account/events",
                  "/account/events/submit-participant",
                ])
                  ? "#8D8963"
                  : "inherit",
              }}
            />
            Events
          </NavLink>
        </li>
      </div>
      {/* Desktop View Menu */}
      <div className="bg-gray-200 w-1/6 p-4 hidden md:flex lg:flex-col md:justify-between">
        <ul className="space-y-2 md:mb-4 list-none md:p-0">
          <li className="cursor-pointer p-2 flex items-center">
            <NavLink
              to="/account/profile"
              className={`flex ${
                isActive(["/account/profile"]) ? "text-secondary" : ""
              }`}
            >
              <Icon
                icon="ic:account-circle"
                className="h-[1.5rem] w-auto mr-2"
                style={{
                  color: isActive(["/account/profile"]) ? "#8D8963" : "inherit",
                }}
              />
              Profile
            </NavLink>
          </li>
          <li className="cursor-pointer p-2 flex items-center">
            <NavLink
              to="/account/manage-athlete"
              className={`flex ${
                isActive(["/account/manage-athlete"]) ? "text-secondary" : ""
              }`}
            >
              <Icon
                icon="solar:user-id-linear"
                className="h-[1.5rem] w-auto mr-2"
                style={{
                  color: isActive(["/account/manage-athlete"])
                    ? "#8D8963"
                    : "inherit",
                }}
              />
              Security
            </NavLink>
          </li>
          <li className="cursor-pointer p-2 flex items-center">
            <NavLink
              to="/account/history-payment"
              className={`flex ${
                isActive(["/account/history-payment"]) ? "text-secondary" : ""
              }`}
            >
              <Icon
                icon="ic:credit-card"
                className="h-[1.5rem] w-auto mr-2"
                style={{
                  color: isActive(["/account/history-payment"])
                    ? "#8D8963"
                    : "inherit",
                }}
              />
              Transaction
            </NavLink>
          </li>
          <li className="cursor-pointer p-2 flex items-center">
            <NavLink
              to="/account/events"
              className={`flex ${
                isActive([
                  "/account/events",
                  "/account/events/submit-participant",
                ])
                  ? "text-secondary"
                  : ""
              }`}
            >
              <Icon
                icon="ic:event"
                className="h-[1.5rem] w-auto mr-2"
                style={{
                  color: isActive([
                    "/account/events",
                    "/account/events/submit-participant",
                  ])
                    ? "#8D8963"
                    : "inherit",
                }}
              />
              Events
            </NavLink>
          </li>
          {userType === "Club" && (
            <li className="cursor-pointer text-[0.9rem] p-2 flex items-center">
              <NavLink  
                to="/account/manage-athlete-list" // Updated path
                className={`flex ${
                  isActive(["/account/manage-athlete-list"])
                    ? "text-secondary"
                    : ""
                }`}
              >
                <Icon
                  icon="solar:user-id-linear"
                  className="h-[1.2rem] w-auto mr-1"
                  style={{
                    color: isActive(["/account/manage-athlete-list"])
                      ? "#8D8963"
                      : "inherit",
                  }}
                />
                Athletes
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
export default ProfileMenu;
