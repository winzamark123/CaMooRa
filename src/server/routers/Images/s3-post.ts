import {
  S3Client,
  PutObjectCommand,
  ListBucketsCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';
import prisma from '@prisma/prisma';

interface GetSignedURLProps {
  file_type: string;
  size: number;
  checksum: string;
  clerkId: string;
  imgWidth?: number;
  imgHeight?: number;
  photoAlbumId?: string;
}

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
  },
});

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex');
const maxFileSize = 1024 * 1024 * 10; // 10MB
const acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml'];

export async function getPresignedURL({
  file_type,
  size,
  checksum,
  clerkId,
  imgWidth,
  imgHeight,
  photoAlbumId,
}: GetSignedURLProps) {
  //check file types
  if (!acceptedTypes.includes(file_type)) {
    console.error('Invalid file type');
    return { error: 'Invalid file type' };
  }

  //check file size
  if (size > maxFileSize) {
    console.error('File size too large');
    return { error: 'File size too large' };
  }

  const generatedFileName = generateFileName();

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
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

  try {
    const imageData: any = {
      clerkId: clerkId,
      url: signedURL.split('?')[0],
      key: `${clerkId}/${generatedFileName}`,
      imgWidth: imgWidth,
      imgHeight: imgHeight,
    };

    // If photoAlbumID is provided, add it to the imageData object (Profile Pic doesn't have photoAlbumId)
    if (photoAlbumId) {
      imageData.PhotoAlbumId = photoAlbumId;
    }

    const images_result = await prisma.images.create({
      data: imageData,
    });
    console.log('images_result:', images_result);
    return { success: { signed_url: signedURL, image_id: images_result.id } };
  } catch (error) {
    console.error('Failed to create image record in database', error);
    return { error: 'Failed to create image record in database' };
  }
}

export async function testAWSCredentials() {
  try {
    console.log('Testing AWS Credentials');
    console.log('AWS_S3_REGION:', process.env.AWS_S3_REGION);
    console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
    console.log('AWS_SECRET_ACCESS_KEY', process.env.AWS_SECRET_ACCESS_KEY);

    const s3 = new S3Client({
      region: process.env.AWS_S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
      },
    });

    const result = await s3.send(new ListBucketsCommand({}));
    console.log('S3 Buckets:', result.Buckets);
  } catch (error) {
    console.error('Error accessing S3:', error);
  }
}
