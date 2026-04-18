import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const assets = join('public', 'fetched-assets');
mkdirSync(assets, { recursive: true });

const url = 'https://raw.githubusercontent.com/processing/p5.js/main/contributors.png';
console.log('Fetching contributors image...');
const res = await fetch(url);
if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`);
const buf = Buffer.from(await res.arrayBuffer());
writeFileSync(join(assets, 'contributors.png'), buf);
console.log('Saved to public/fetched-assets/contributors.png');