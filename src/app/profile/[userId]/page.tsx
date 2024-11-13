// use client is necessary to propogate the user onto the navbar (somehow)
'use client';
import Profile from '@/app/profile/[userId]/_components/Profile/Profile';

export default function Page() {
  return (
    <main className="pb-auto w-full max-w-7xl overflow-hidden pb-4 sm:pb-10 md:pb-12">
      <Profile />
    </main>
  );
}
