import { trpc } from '@/lib/trpc/client';
import { FormEvent, useState } from 'react';
import { ContactProps, ProfileProps } from './Profile';

interface EditProfileFormProps {
  profile: ProfileProps;
  contact: ContactProps;
  userId: string;
  refetchProfile: () => void;
  refetchContact: () => void;
}

export default function EditProfileForm({
  contact,
  profile,
  userId,
  refetchProfile,
  refetchContact,
}: EditProfileFormProps) {
  const [firstName, setFirstName] = useState<string>(profile.firstName);
  const [lastName, setLastName] = useState<string>(profile.lastName);
  const firstNameSave = trpc.profile.updateFirstName.useMutation({
    onSuccess: () => {
      console.log('First name updated successfully');
      refetchProfile();
    },
    onError: (error) => {
      console.error('Error updating first name', error.message);
    },
  });

  function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (firstName !== profile.firstName && firstName.length >= 2) {
      console.log('firstName was changed');
      firstNameSave.mutate({ userId, firstName });
    } else {
      console.log('firstName was NOT changed or NOT long enough');
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSave(e);
        }}
      >
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          placeholder={firstName}
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          name="First Name"
          className="block border-2 hover:border-gray-600"
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          placeholder={lastName}
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          className="block border-2 hover:border-gray-600"
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          placeholder={contact.email}
          readOnly
          className="block cursor-not-allowed border-2"
        />
        <button
          type="submit"
          className="mt-2 border-2 border-green-500 hover:border-green-800"
        >
          Save
        </button>
      </form>
    </div>
  );
}
