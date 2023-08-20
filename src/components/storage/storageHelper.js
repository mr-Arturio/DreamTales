import { Storage } from '@google-cloud/storage';
import path from 'path';

const storage = new Storage({
  keyFilename: path.join(process.cwd(), 'keys', 'dream-tales-396317-a15c3eb6a7f7.json'), // Update the path accordingly
});

const bucketName = 'dream-tales-images';

export async function uploadImage(imageBuffer, imageFileName) {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(imageFileName);

  await file.save(imageBuffer);

  return `https://storage.googleapis.com/${bucketName}/${imageFileName}`;
}
