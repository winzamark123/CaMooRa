import Image from 'next/image';
import PopupSVG from '@public/fo-moo-pop-up.svg';
import PopUp from '../PopUp';

export default function DemoPopUp({ onToggle }: { onToggle: () => void }) {
  return (
    <PopUp onToggle={onToggle} title="Demo Pop Up">
      <div className="flex h-80 w-11/12 max-w-4xl justify-between rounded-2xl bg-sky-900 px-16 text-white xs:w-9/12">
        <div className="flex w-3/5 flex-col justify-center gap-6">
          <h2 className="text-4xl font-bold">ARE YOU A PHOTOGRAPHER?</h2>
          <p className="text-xl">
            Don't forget to activate your{' '}
            <span className="text-theme_yellow">photographers account!</span>
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white">
                <span>1.</span>
              </div>
              <p className="text-lg">
                Click the <span className="text-theme_yellow">"Edit"</span>{' '}
                button in your profile.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white">
                <span>2.</span>
              </div>
              <p className="text-lg">
                Toggle{' '}
                <span className="text-theme_yellow">
                  "Activate Photographer's Account"
                </span>{' '}
                switch
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-2/5 items-end justify-end">
          <Image
            src={PopupSVG}
            alt="caMOOra Pop Up"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </PopUp>
  );
}
