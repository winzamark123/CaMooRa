import { useUser, SignedOut } from '@clerk/nextjs';
import { trpc } from '@/lib/trpc/client';
import { Button } from '@/components/ui/button';
import IconComponents from '../IconComponents';

interface ContactsProps {
  clerkId: string;
  toggleSignInPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  toggleEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Contacts({
  clerkId,
  toggleSignInPopUp,
  toggleEditing,
}: ContactsProps) {
  const { isSignedIn, user: currentUser } = useUser();
  const {
    data: contact,
    isLoading: isContactLoading,
    error: contactError,
    // refetch: refetchContact,
  } = trpc.contact.getContact.useQuery({ clerkId });

  if (isContactLoading) return <div className="">Contact Loading</div>;
  if (contactError) return <div className="">{contactError.message}</div>;

  const userLinks = [
    contact?.phone && { type: 'phone', data: contact.phone },
    contact?.discord && { type: 'discord', data: contact.discord },
    contact?.whatsApp && { type: 'whatsapp', data: contact.whatsApp },
    contact?.instagramLink && {
      type: 'instagram',
      data: { link: contact.instagramLink, title: contact.instagramTitle },
    },
    contact?.portfolioLink && {
      type: 'portfolio',
      data: { link: contact.portfolioLink, title: contact.portfolioTitle },
    },
    contact?.email && { type: 'email', data: contact.email },
  ].filter(
    (link) =>
      link !== null &&
      typeof link === 'object' &&
      'type' in link &&
      'data' in link
  );

  return (
    <div className="flex flex-grow flex-col">
      {isSignedIn && contact?.isContactPublic && (
        <div className="flex pt-5 sm:justify-end sm:pt-0">
          <div className="flex flex-col space-y-4 xl:space-y-6">
            <h2 className="text-sm font-semibold lg:text-lg 2xl:text-xl">
              Contact
            </h2>
            <ul className="grid list-none grid-cols-2 gap-5 break-all sm:grid-cols-1">
              {userLinks.map((link, index) => {
                if (!link) return null;

                const IconComponent = IconComponents[link.type];

                if (IconComponent) {
                  return (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-3">
                        {IconComponent}
                        {/* Checks for Links  */}
                        {typeof link.data === 'object' &&
                        (link.type === 'portfolio' ||
                          link.type === 'instagram') ? (
                          <a
                            className="cursor-pointer text-sm underline hover:text-blue-800"
                            aria-label={`Link to ${link.type}`}
                            href={link.data.link}
                          >
                            {link.data.title
                              ? link.data.title
                              : link.type[0].toUpperCase() + link.type.slice(1)}
                          </a>
                        ) : (
                          // No Links
                          <span className="text-sm">
                            {typeof link.data === 'string'
                              ? link.data
                              : link.data.link}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      )}
      <div className="mt-auto flex items-end justify-end">
        {currentUser?.id === clerkId && (
          <Button
            className="mt-8 w-full border border-gray-400 bg-profile_button_bg text-xs text-black hover:bg-primary_blue hover:text-white focus:bg-primary_blue  focus:text-white sm:w-20"
            aria-label="Edit your Profile"
            onClick={() => toggleEditing(true)}
          >
            Edit
          </Button>
        )}
        <SignedOut>
          <Button
            onClick={() => toggleSignInPopUp(true)}
            className="mt-8 w-full border border-gray-400 bg-profile_button_bg text-xs text-black hover:bg-primary_blue hover:text-white focus:bg-primary_blue  focus:text-white sm:w-20"
            aria-label={`Contact`}
          >
            Contact
          </Button>
        </SignedOut>
      </div>
    </div>
  );
}
