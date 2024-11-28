import ExhibitionHall from './_components/ExbibitionHall/ExhibitionHall';
export default async function Home() {
  return (
    <main className="flex w-full max-w-5xl flex-col gap-4 overflow-hidden sm:p-10">
      <ExhibitionHall />
    </main>
  );
}
