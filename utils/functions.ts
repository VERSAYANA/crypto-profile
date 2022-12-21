export function getValidUrlFromUsernameOrUrl(
  usernameOrUrl: string,
  websitePrefix: string
): string {
  if (!usernameOrUrl.startsWith('http') && !usernameOrUrl.startsWith('www')) {
    return websitePrefix + usernameOrUrl
  }
  return usernameOrUrl
}
