import * as path from 'node:path'
import * as url from 'url'
import fs from 'fs-extra'
import glob from 'glob'
import minimatch from 'minimatch'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const ignoreList = [
  '**/*.spec.ts',
  '**/*.test.ts',
  '**/tests/**/*',
  '**/dist/**/*',
  '**/node_modules/**/*',
  '**/__mocks__/*',
  '**/package.json',
  '**/vite.config.ts',
  '**/vitest.setup.ts',
]

function shouldIgnore(filePath) {
  return ignoreList.some(p => minimatch(filePath, p))
}

async function syncFiles(input, output) {
  const files = glob.sync('**/*', { cwd: input, nodir: true })

  for (const file of files) {
    const sourcePath = path.resolve(input, file)
    if (!shouldIgnore(sourcePath)) {
      const destinationPath = path.join(output, file)
      await fs.ensureDir(path.dirname(destinationPath))
      await fs.copyFile(sourcePath, destinationPath)
    }
  }
}

const inputDir = path.resolve(__dirname, '../../frontend')
const outputDir = path.resolve(__dirname, '../')

syncFiles(inputDir, outputDir)
