import { Storage } from '@google-cloud/storage';
import path from 'path';

const storage = new Storage({
  keyFilename: process.env.GCS_KEY_FILE,
});

const bucketName = 'dream-tales-images';

export async function uploadImage(imageBuffer, imageFileName) {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(imageFileName);

  await file.save(imageBuffer);

  return `https://storage.googleapis.com/${bucketName}/${imageFileName}`;
}
