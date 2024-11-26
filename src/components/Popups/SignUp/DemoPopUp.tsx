import PopUp from '../PopUp';

export default function DemoPopUp({ onToggle }: { onToggle: () => void }) {
  return (
    <PopUp onToggle={onToggle} title="Demo Pop Up">
      <div className="flex justify-between overflow-hidden rounded-2xl border">
        <div className="flex w-1/2 flex-col justify-center gap-6 bg-sky-900 p-8 text-white">
          <h2 className="text-3xl font-bold">ARE YOU A PHOTOGRAPHER?</h2>
          <p className="text-xl">
            Don't forget to activate your{' '}
            <span className="text-theme_yellow">photographers account!</span>
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white p-2">
                <span>1.</span>
              </div>
              <p className="text-lg">
                Click the <span className="text-theme_yellow">"Edit"</span>{' '}
                button in your profile.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white p-2">
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

        <div className="relative flex w-1/2 items-end justify-end bg-white">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="@public/demo/WelcomeDemo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </PopUp>
  );
}
