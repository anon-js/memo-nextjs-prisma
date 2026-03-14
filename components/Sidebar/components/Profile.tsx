"use client";

import { LogOut, Settings, User2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { Dropdown } from "@/components/ui/Dropdown";
import { User } from "@/types";
import { Button } from "@/components/ui/Button";

export default function Profile({ user }: { user: User }) {
  const handleLogout = () => {
    signOut({ redirectTo: "/login" });
  };

  return (
    <div className="flex md:items-center items-start justify-between max-md:flex-col max-md:gap-4">
      <div className="flex items-center gap-2 text-left max-md:ps-0.5">
        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
          {user.username[0].toUpperCase()}
        </div>
        <span className="flex-1 text-lg font-medium text-gray-700 truncate">
          {user.username}
        </span>
      </div>
      <Dropdown className="relative max-md:hidden">
        <Dropdown.Trigger>
          <Button
            variant="ghost"
            icon={Settings}
            iconSize={20}
            className="p-2"
            title="설정"
          />
        </Dropdown.Trigger>
        <Dropdown.List side="bottom" align="end">
          <Dropdown.Item icon={User2} href="/profile">
            프로필 설정
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item icon={LogOut} variant="danger" onClick={handleLogout}>
            로그아웃
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
      <div className="flex items-center gap-2 md:hidden w-[-webkit-fill-available]">
        <Button
          icon={User2}
          variant="ghost"
          className="p-2"
          href="/profile"
          title="프로필 설정"
          fullWidth
        >
          프로필 설정
        </Button>
        <Button
          icon={LogOut}
          variant="danger"
          className="p-2"
          onClick={handleLogout}
          title="로그아웃"
          fullWidth
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
}