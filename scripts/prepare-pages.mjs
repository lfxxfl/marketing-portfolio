import {
  copyFile,
  mkdir,
  readdir,
  rename,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = path.resolve('dist/client');
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const inferredPagesBasePath =
  process.env.GITHUB_ACTIONS === 'true' &&
  repositoryName &&
  !repositoryName.endsWith('.github.io')
    ? repositoryName
    : '';
const pagesBasePath = (
  process.env.NEXT_PUBLIC_BASE_PATH ?? inferredPagesBasePath
)
  .replace(/^\//, '')
  .replace(/\/$/, '');
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

// vinext writes asset-prefixed framework files into a matching nested folder.
// GitHub Pages already mounts the artifact at the repository base path, so the
// physical artifact must keep `_next` at its root while HTML URLs retain the
// `/repository/_next/...` prefix.
if (pagesBasePath) {
  const nestedFrameworkDirectory = path.join(
    outputDirectory,
    pagesBasePath,
    '_next',
  );
  const rootFrameworkDirectory = path.join(outputDirectory, '_next');

  try {
    await stat(nestedFrameworkDirectory);
    await rename(nestedFrameworkDirectory, rootFrameworkDirectory);
    await rm(path.join(outputDirectory, pagesBasePath), {
      recursive: true,
      force: true,
    });
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
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
