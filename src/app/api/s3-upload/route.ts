import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    // const buffer = Buffer.from(await file.arrayBuffer());
    // const fileName = await uploadFileToS3(buffer, file.name);
  } catch (err) {
    console.error('ERROR UPLOADING FILE' + err);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
  console.log(s3Client);
}
