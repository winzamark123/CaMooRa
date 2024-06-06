import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { trpc } from '@/lib/trpc/client';

export default async function DashBoard() {
  const user = await currentUser();

  if (!user) {
    return <main>Not Logged In to Current User</main>;
  }

  const {
    data: user_profile,
    isLoading,
    error,
  } = trpc.user.checkUser.useQuery({
    clerkId: user.id,
  });

  if (isLoading) {
    return <main>Loading...</main>;
  }

  if (error) {
    return <main>Error: {error.message}</main>;
  }

  if (!user) {
    return <main>Not Logged In to Current User</main>;
  }

  return (
    <main>
      <div className=""></div>
    </main>
  );
}
