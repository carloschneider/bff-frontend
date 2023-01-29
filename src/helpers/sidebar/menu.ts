import type { Location, Params } from '@remix-run/router'

export type MatchesType = {
  id: string
  pathname: string
  params: Params<string>
  data: unknown
  handle: unknown
}

export type LocationType = Location

export const selectedKey = (
  matches: MatchesType[],
  location: LocationType
): string => {
  const lastMatch = matches.at(-1)

  if (!lastMatch) {
    return location.pathname
  }

  const { pathname, params } = lastMatch

  if (!Object.keys(params).length) {
    return location.pathname
  }

  let path = pathname

  Object.keys(params).forEach((item: string) => {
    const param = params[item] as string

    path = path.replace(`/${param}`, '')
  })

  return path
}
