import React from 'react';
import PopUp from '../PopUp';
// import Image from 'next/image';
// import PopupSVG from '@public/fo-moo-pop-up.svg';

export default function DemoPopUp({ onToggle }: { onToggle: () => void }) {
  return (
    <PopUp onToggle={onToggle} title="Sign In Pop Up">
      <div className="flex">
        <div className="flex w-1/2 flex-col gap-4 p-10">
          <h2>Are you a photographer?</h2>
          <p>
            Don't forget to activate your{' '}
            <span className="text-theme_yellow">photographers account!</span>
          </p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              Click the <span className="text-theme_yellow">Edit</span> button
              in your profile.
            </li>
            <li>
              Toggle the{' '}
              <span className="text-theme_yellow">
                Activate Photographer's Account
              </span>{' '}
              switch.
            </li>
          </ol>
        </div>
        <div className="w-1/2 bg-white"></div>
      </div>
    </PopUp>
  );
}
