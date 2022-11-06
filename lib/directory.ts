import type { File } from 'types/files'

import json from 'dirty-json'
import glob from 'fast-glob'
import fs from 'fs/promises'
import path from 'path'

export async function listDirectory(source: string): Promise<File[]> {
  const files = await glob(source)
  return await Promise.all(files.map(processFile))
}

export async function processFile(file: string): Promise<File> {
  try {
    const filePath = path.resolve(file)
    const [fileStats, fileContents] = await Promise.all([
      fs.stat(filePath),
      fs.readFile(filePath, 'utf8'),
    ])

    const base = path.resolve()
    const directory = path.dirname(filePath).substring(base.length + 1)
    const extension = path.extname(filePath)
    const name = path.basename(filePath, extension)

    const res = {
      extension,
      name,
      title: name.replace(/-/g, ' '),
      path: filePath.substring(base.length + 1),
      directory,
      url: `${directory.substring(6)}${
        name.indexOf('index') >= 0 ? '' : `/${name}`
      }`,
      date: fileStats.birthtime.toISOString(),
    }

    const match = fileContents.match(/export\sconst\smeta\s=\s({[\s\S]+?})/gm)

    if (match) {
      const metaMatch = match[0].match(/({[\s\S]+?})/gm)

      if (metaMatch) {
        const meta = json.parse(metaMatch[0])
        return {
          ...res,
          ...meta,
        }
      }
    }

    return res
  } catch (err) {
    throw new Error('Error processing file')
  }
}
