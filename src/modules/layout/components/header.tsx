"use client";

import { Unplug, Search } from "lucide-react";
import React from "react";
import UserButton from "@/modules/authentication/components/user-button";
import { UserProps } from "../types";
import SearchBar from "./search-bar";
import InviteMember from "./invite-member";
import Workspace from "./workspace";

interface Props {
  user: UserProps;
}

const Header = ({ user }: Props) => {
  return (
    <header className="flex items-center justify-between px-4 py-2 border overflow-hidden">
      {/* Left: Logo */}
      <div className="flex items-center hover:cursor-pointer hover:opacity-80">
        <Unplug size={28} className="text-indigo-400" />
      </div>

      {/* Center: Search */}
      <div className="flex-1 flex items-center justify-center px-6 max-w-lg mx-auto">
        <div
          className="border-animation relative p-[1px] rounded w-full overflow-hidden flex items-center justify-center"
          aria-hidden="true"
        >
          <SearchBar />
        </div>
      </div>

      {/* Right: User */}
      <div className="flex items-center justify-end space-x-2">
        <InviteMember/>
        <Workspace/>
        <UserButton user={user} size="sm" />
      </div>
    </header>
  );
};

export default Header;
