import Image from 'next/image';
import fomooLogo from '@/public/fo-moo-logo.svg';

export default function Landing() {
  return (
    <main className="flex w-full flex-col border font-mono">
      <h1>PHOTOGRAPHER</h1>
      <h3>CAPTURE</h3>
      <div className="flex">
        <Image
          src={fomooLogo}
          alt="logo landing page"
          width={100}
          height={100}
        />
        <h1>SERVICE</h1>
      </div>
      <h3>YOUR MEMORIES</h3>
    </main>
  );
}
