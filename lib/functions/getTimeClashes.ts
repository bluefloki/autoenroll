import type { ClassTimings } from "~lib/type"
import { isRangeOverlap } from "range-overlap"

export const getTimeClashes = (classTimings: ClassTimings[]) => {
  let clashes: ClassTimings[] = []

  for (const i of classTimings) {
    for (const j of classTimings) {
      // pass onto the next if element is the same
      if (i.class == j.class) continue

      // if days overlap, check if time overlaps
      if (i.schedule.days.some((r) => j.schedule.days.includes(r))) {
        if (isRangeOverlap(i.schedule.timings, j.schedule.timings) === true)
          clashes.push(i, j)
      }
    }
  }

  return [...new Set(clashes)]
}
