import PhotographersList from '../components/Profile/PhotographersList';
import Landing from '@/components/Landing/Landing';
import { SignedIn } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import UsernameProfilePic from '@/components/services/UsernameProfilePic';

export default async function Home() {
  const { userId } = auth();
  return (
    <main className="flex w-full flex-col items-center p-10">
      <div className="">
        <Landing />
      </div>
      <div className="flex w-full">
        {userId && (
          <SignedIn>
            <UsernameProfilePic id={userId} />
          </SignedIn>
        )}
      </div>
      <div className="h-30 flex w-full flex-col ">
        <PhotographersList />
      </div>
    </main>
  );
}
