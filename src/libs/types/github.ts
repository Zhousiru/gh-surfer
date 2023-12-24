import { Endpoints } from '@octokit/types'

export type RepoContentData =
  Endpoints['GET /repos/{owner}/{repo}/contents/{path}']['response']['data']

export type RepoContentDirData = Extract<RepoContentData, any[]>

export function isDir(x: RepoContentData): x is RepoContentDirData {
  return Array.isArray(x)
}
