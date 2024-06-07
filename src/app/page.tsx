import PhotographersList from './_components/PhotographersList';
import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    return <main>Not logged In</main>;
  }

  // Need some TypeScript help (Passing down names becomes repetitive)
  return (
    <main className="flex flex-col items-center">
      <div className="h-30 flex w-full flex-col ">
        <PhotographersList clerkId={user.id} firstName={user.firstName} lastName={user.lastName}/>
      </div>
    </main>
  );
}
