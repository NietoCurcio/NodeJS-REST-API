import fs from 'node:fs';

export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename);
  } catch (err) {
    return;
  }

  await fs.promises.unlink(filename);
};
