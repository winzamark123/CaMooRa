import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

interface deletePhotoProps {
  key: string;
}

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
  },
});

export async function deletePhotoCommand({ key }: deletePhotoProps) {
  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Key: key,
  });

  try {
    await s3.send(deleteObjectCommand);
    return { success: 'Photo deleted', error: '' };
  } catch (error) {
    console.error('Error deleting photo', error);
    return { success: '', error: 'Error deleting photo' };
  }
}
