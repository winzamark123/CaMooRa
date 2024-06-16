import Profile from '@/components/Profile/Profile';
import CreatePostForm from '@/components/Profile/CreatePostForm';

export default function Page() {
  return (
    <main>
      <div className="flex flex-col">
        <Profile />
      </div>
      <CreatePostForm />
    </main>
  );
}
