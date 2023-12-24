import { RepoContentDirData } from '../types/github'

export function sortDirData(data: RepoContentDirData) {
  const ignoreFiles = process.env.IGNORE_FILES.split(',').map((x) => x.toLowerCase())

  return data
    .filter((d) => !(d.name.startsWith('.') || ignoreFiles.includes(d.name.toLowerCase())))
    .sort((a, b) => {
      if (a.type !== b.type) {
        return a.type.localeCompare(b.type)
      }
      return a.name.localeCompare(b.name)
    })
}
