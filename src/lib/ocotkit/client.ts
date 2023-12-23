import { Octokit } from 'octokit'

export function useOctokit() {
  return new Octokit({ request: { fetch } })
}
