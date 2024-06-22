import fs from 'fs-extra';
import {resetManifest} from './lib/assets.js';

export async function clean() {
  const config = await fs.readJSON('./config.json');

  await fs.remove(config.publicDir);
  resetManifest();
}
