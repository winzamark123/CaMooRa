import { findOrCreateUser } from '@/server/routers/User/userUtils';
import PhotographersList from './_components/PhotographersList';
import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return <main>Not logged In</main>;
  }

  // Call utility function directly to keep component as Server Side (I might be wrong)
  const userEmail = clerkUser.emailAddresses[0]?.emailAddress
  const appUser = await findOrCreateUser({
    clerkId : clerkUser.id,
    userFirstName: clerkUser.firstName,
    userLastName: clerkUser.lastName,
    userEmail,
  }); 

  return (
    <main className="flex flex-col items-center">
      <div className="h-30 flex w-full flex-col ">
        <PhotographersList clerkId={clerkUser ? clerkUser.id : appUser.clerkId} />
      </div>
    </main>
  );
}
