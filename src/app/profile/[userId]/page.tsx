import Profile from '@/app/_components/Profile';

export default function MainProfile({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  return (
    <div>
      <Profile userId={userId} />
    </div>
  );
}
