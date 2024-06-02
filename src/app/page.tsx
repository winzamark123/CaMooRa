'use client';
import TempUser from './_components/TempUser';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between border border-black p-24">
      <div className="h-30 flex w-full flex-col border border-black">
        <h1>HELLO WORLD</h1>
        <TempUser />
      </div>
    </main>
  );
}
