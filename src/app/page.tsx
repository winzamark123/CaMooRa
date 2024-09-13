import MainGallery from './_components/MainGallery';
import Landing from '@/app/_components/Landing/Landing';

export default async function Home() {
  return (
    <main className="flex w-full max-w-5xl flex-col items-center gap-4 overflow-hidden ">
      <div className="w-full p-10">
        <Landing />
      </div>
      <div className="sm:p-10">
        <MainGallery />
      </div>
    </main>
  );
}
