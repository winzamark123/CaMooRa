import Image from 'next/image';

interface ProfilePicProps {
  imageURL: string | undefined;
}

export default function ProfilePic({ imageURL }: ProfilePicProps) {
  return (
    <div className="relative h-40 w-40 rounded-full md:h-32 md:w-32 lg:h-36 lg:w-36 xl:h-48 xl:w-48">
      {imageURL && (
        <Image
          src={imageURL}
          alt={`Profile Picture`}
          objectFit="cover"
          layout="fill"
          className="rounded-full border border-black"
        />
      )}
    </div>
  );
}
