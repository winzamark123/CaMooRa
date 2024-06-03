import React from 'react';
import { Card } from '@/components/ui/card';

interface ProfileCardProps {
  name: string;
  profile_url: string;
  bio: string;
  experience: number;
}

export default function ProfileCard({
  name,
  profile_url,
  bio,
  experience,
}: ProfileCardProps) {
  return (
    <main className="flex">
      <Card>
        <div className="">
          {name}
          {profile_url}
          {bio}
          {experience}
        </div>
      </Card>
    </main>
  );
}
