import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { auth } from '@clerk/nextjs/server';

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
  },
});

const maxFileSize = 1024 * 1024 * 10; // 10MB
const acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml'];

export async function getSignedURL(
  file_type: string,
  size: number,
  checksum: string
) {
  const { userId } = auth();
  if (!acceptedTypes.includes(file_type)) {
    return { error: 'Invalid file type' };
  }

  if (size > maxFileSize) {
    return { error: 'File size too large' };
  }
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME as string,
    Key: 'test',
    ContentType: file_type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: {
      clerkId: userId as string,
    },
  });

  const signedURL = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 3600,
  });

  return { success: { url: signedURL } };
}
