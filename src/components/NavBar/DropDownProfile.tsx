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
import Settings from '@/components/Settings/Settings';
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
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <SignOutButton>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </SignOutButton>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Settings />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
