export function minutesAgo(date: Date, minutes: number) {
  return Date.now() - date.getTime() >= minutes * 60 * 1000;
}
