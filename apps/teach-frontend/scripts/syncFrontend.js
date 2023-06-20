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
  '**/scripts/syncFrontend.js',
]

function shouldIgnore(filePath) {
  return ignoreList.some(p => minimatch(filePath, p))
}

function getIncludeFiles(directoryPath) {
  const files = glob.sync('**/*', { cwd: directoryPath, nodir: true })

  return files.reduce((result, current) => {
    if (!shouldIgnore(current))
      result.push(current)

    return result
  }, [])
}

const frontendPath = path.resolve(__dirname, '../../frontend')
const teachPath = path.resolve(__dirname, '../')

async function updateFileContent() {
  const files = getIncludeFiles(frontendPath)

  for (const file of files) {
    const sourcePath = path.resolve(frontendPath, file)
    const destinationPath = path.join(teachPath, file)
    await fs.ensureDir(path.dirname(destinationPath))
    await fs.copyFile(sourcePath, destinationPath)
  }
}

async function removeDiscardedFile() {
  const files = getIncludeFiles(teachPath)

  for (const file of files) {
    const frontendFile = path.resolve(frontendPath, file)
    const exists = await fs.pathExists(frontendFile)
    if (!exists) {
      const teachFile = path.resolve(teachPath, file)
      fs.removeSync(teachFile)
    }
  }
}

updateFileContent()
removeDiscardedFile()
