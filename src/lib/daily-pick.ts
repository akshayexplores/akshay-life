/**
 * The daily pick.
 *
 * One insight is featured at the top of /darshana, and which one it is turns
 * over at midnight. The choice is a pure function of the calendar date and the
 * size of the archive, so every visitor on a given day sees the same piece and
 * nobody has to tag anything.
 *
 *   index = (dayOfYear + year) % total
 *
 * Adding a piece changes `total`, which reshuffles the whole cycle from that
 * day on. That is intended — the rotation is not a fixed schedule, it is a
 * deterministic function of the archive as it stands today.
 *
 * Note on the cycle length: with N pieces the sequence repeats every N days,
 * not every year. The `+ year` term shifts the sequence by one position per
 * year; the larger year-over-year shift comes from 365 % N anyway.
 */

/** The site is written from, and mostly read in, IST. Roll over at IST midnight. */
export const PICK_TIMEZONE = "Asia/Kolkata"

/**
 * Calendar date in a named timezone, without pulling in a date library.
 * `en-CA` formats as YYYY-MM-DD, which is the only reason it is used here.
 */
function calendarDate(now: Date, timeZone: string): { year: number; month: number; day: number } {
  const [year, month, day] = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(now)
    .split("-")
    .map(Number)

  return { year, month, day }
}

/** 1 on 1 January, 365 or 366 on 31 December. */
export function dayOfYear(now: Date = new Date(), timeZone: string = PICK_TIMEZONE): number {
  const { year, month, day } = calendarDate(now, timeZone)
  const startOfYear = Date.UTC(year, 0, 1)
  const today = Date.UTC(year, month - 1, day)
  return Math.floor((today - startOfYear) / 86_400_000) + 1
}

/**
 * Index of today's featured piece, in [0, total).
 * Returns 0 for an empty or nonsensical archive so a caller can never index
 * out of bounds.
 */
export function dailyIndex(
  total: number,
  now: Date = new Date(),
  timeZone: string = PICK_TIMEZONE
): number {
  if (!Number.isInteger(total) || total <= 0) return 0
  const { year } = calendarDate(now, timeZone)
  return (dayOfYear(now, timeZone) + year) % total
}

/**
 * Today's pick from a list, or null if the list is empty.
 * Order matters: the same list in a different order yields a different pick.
 */
export function dailyPick<T>(
  items: readonly T[],
  now: Date = new Date(),
  timeZone: string = PICK_TIMEZONE
): T | null {
  if (!items.length) return null
  return items[dailyIndex(items.length, now, timeZone)] ?? null
}
