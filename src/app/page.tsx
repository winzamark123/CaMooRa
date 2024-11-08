import ExhibitionHall from './_components/ExhibitionHall';
export default async function Home() {
  return (
    <main className="flex w-full max-w-5xl flex-col items-center gap-4 overflow-hidden">
      <div className="max-w-5xl sm:p-10">
        <ExhibitionHall />
      </div>
    </main>
  );
}
