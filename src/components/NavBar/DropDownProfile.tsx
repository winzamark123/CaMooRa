'use client';

import * as React from 'react';

import { SignOutButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UsernameProfilePic from './User/UsernameProfilePic';
import Link from 'next/link';
import SettingsModal from '../SettingsModal/SettingsModal';
import { LogOut } from 'lucide-react';
import { User } from 'lucide-react';
export function DropDownProfile({ userId }: { userId: string }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <UsernameProfilePic id={userId} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href={`/profile/${userId}`}>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <SettingsModal />
          </DropdownMenuItem>
          <SignOutButton>
            <DropdownMenuItem className="flex bg-red-700 text-white hover:bg-red-800">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </SignOutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
