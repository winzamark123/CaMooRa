'use client';
import MoreTempUser from '@/components/MoreTempUser';
import PhotographersList from '@/components/PhotographersList';

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="h-30 flex w-full flex-col ">
        <MoreTempUser />
        <PhotographersList />
      </div>
    </main>
  );
}
