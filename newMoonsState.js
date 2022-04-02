import { calculateNewMoons } from './calculateNewMoons'
import { addDays } from './dateHelpers'

export const allNewMoons = calculateNewMoons()

export function getStartEndDates (newMoonTime = allNewMoons[0].getTime()) {
  const firstOfTheYearIndex = allNewMoons.findIndex(el => el.getTime() == newMoonTime)

  const startEndDates = {}

  let i = 1
  for (const newMoon of allNewMoons.slice(firstOfTheYearIndex)) {
    if (startEndDates[i-1] !== undefined) {
      startEndDates[i-1].end = addDays(newMoon, -1)
    }

    // Include a 13th month in order to display the possible Adar II
    if (i >= 14) break

    if (startEndDates[i] === undefined) startEndDates[i] = {}
    startEndDates[i].start = newMoon

    i++
  }
  return startEndDates
}
