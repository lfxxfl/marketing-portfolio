import { copyFile, mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = path.resolve('dist/client');
const unpublishedSourceVideos = [
  'assets/projects/my-work/video-editing/cruel-summer.mov',
  'assets/projects/my-work/others/delta-virus-scriptwriting.mp4',
];

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(entryPath)));
    } else {
      files.push(entryPath);
    }
  }

  return files;
}

for (const sourceVideo of unpublishedSourceVideos) {
  await rm(path.join(outputDirectory, sourceVideo), { force: true });
}

const htmlFiles = (await collectFiles(outputDirectory)).filter(
  (file) => file.endsWith('.html') && !['index.html', '404.html'].includes(path.basename(file)),
);

for (const htmlFile of htmlFiles) {
  const relativePath = path.relative(outputDirectory, htmlFile);
  const routePath = relativePath.slice(0, -'.html'.length);
  const routeDirectory = path.join(outputDirectory, routePath);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(htmlFile, path.join(routeDirectory, 'index.html'));
}

await writeFile(path.join(outputDirectory, '.nojekyll'), '');

const oversizedFiles = [];
for (const file of await collectFiles(outputDirectory)) {
  const fileStats = await stat(file);
  if (fileStats.size >= 100 * 1024 * 1024) {
    oversizedFiles.push(`${path.relative(outputDirectory, file)} (${fileStats.size} bytes)`);
  }
}

if (oversizedFiles.length > 0) {
  throw new Error(`GitHub Pages output contains files of 100 MiB or more:\n${oversizedFiles.join('\n')}`);
}

console.log(`Prepared ${htmlFiles.length} directory-style routes for GitHub Pages.`);
