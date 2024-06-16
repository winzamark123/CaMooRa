import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';
import prisma from '@prisma/prisma';

interface IGetSignedURLProps {
  file_type: string;
  size: number;
  checksum: string;
  clerkId: string;
}

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
  },
});

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex');
const maxFileSize = 1024 * 1024 * 10; // 10MB
const acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml'];

export async function createPresignedURL() {}

export async function getSignedURL({
  file_type,
  size,
  checksum,
  clerkId,
}: IGetSignedURLProps) {
  //check file types
  if (!acceptedTypes.includes(file_type)) {
    return { error: 'Invalid file type' };
  }

  //check file size
  if (size > maxFileSize) {
    return { error: 'File size too large' };
  }

  const generatedFileName = generateFileName();

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME as string,
    Key: `${clerkId}/${generatedFileName}`,
    ContentType: file_type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: {
      clerkId: clerkId,
    },
  });

  const signedURL = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 3600,
  });

  // create image record in database
  const images_result = await prisma.images.create({
    data: {
      clerkId: clerkId,
      url: signedURL.split('?')[0],
    },
  });

  return { success: { signed_url: signedURL, image_id: images_result.id } };
}
