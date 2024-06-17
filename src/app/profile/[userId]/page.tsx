import Profile from '@/components/Profile/Profile';
import CreatePostForm from '@/components/Profile/CreatePostForm';

export default function Page() {
  return (
    <main className="w-full px-4 pb-4 pt-2 md:px-8 md:pb-8 md:pt-4 lg:px-24 lg:pb-24 lg:pt-12">
      <Profile />
      <CreatePostForm />
    </main>
  );
}
