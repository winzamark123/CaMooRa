'use client';
import MoreTempUser from '@/components/MoreTempUser';
import ProfileCard from '@/components/ProfileCard';

const mockUser = {
  name: 'John Doe',
  profile_url: 'https://www.example.com',
  bio: 'I am a web developer',
  experience: 10,
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between border border-black p-24">
      <div className="h-30 flex w-full flex-col border border-black">
        <h1>HELLO WORLD</h1>
        <MoreTempUser />
        <ProfileCard {...mockUser} />
      </div>
    </main>
  );
}
