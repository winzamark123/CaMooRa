import PhotographersList from './_components/PhotographersList';
import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    return <main>Not logged In</main>;
  }

  return (
    <main className="flex flex-col items-center">
      <div className="h-30 flex w-full flex-col ">
        <PhotographersList clerkId={user.id} />
      </div>
    </main>
  );
}
