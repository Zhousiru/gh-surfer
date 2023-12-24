import { Endpoints } from '@octokit/types'

export type RepoContentData =
  Endpoints['GET /repos/{owner}/{repo}/contents/{path}']['response']['data']

export type RepoContentDirData = Extract<RepoContentData, any[]>
export type RepoContentFileData = Extract<RepoContentData, { type: 'file' }>

export function isDir(x: RepoContentData): x is RepoContentDirData {
  return Array.isArray(x)
}

export function isFile(x: RepoContentData): x is RepoContentFileData {
  return !Array.isArray(x) && x.type === 'file'
}
