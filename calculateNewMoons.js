/*
  Copyright (C) 2022 by Joseph Turner

  biblical-lunisolar-calendar is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  biblical-lunisolar-calendar is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with biblical-lunisolar-calendar.  If not, see <https://www.gnu.org/licenses/>.
*/
import suncalc from 'suncalc'
import { zonedTimeToUtc, formatInTimeZone } from 'date-fns-tz'

import { rawNewMoons } from './rawNewMoons'
import { daysBetweenDates } from './dateHelpers'

const jerusalemTZ = 'Asia/Jerusalem'
const loc = [31.79592425, 35.21198075969497];

export function calculateNewMoons () {
  const newMoons = []

  for (const { year, month, day, hours, minutes } of rawNewMoons) {
    // This Date object uses the current locale instead of Jerusalem.
    const newMoonAnyTimeZone = new Date(year, month - 1, day, hours, minutes)

    // Get a new Date object adjusted to Jerusalem time.
    const newMoonUTCTime = zonedTimeToUtc(newMoonAnyTimeZone, jerusalemTZ)

    // Get sunset time in Jerusalem.
    const { sunset: sunsetUTCTime } = suncalc.getTimes(newMoonUTCTime, loc[0], loc[1]);
    // Uncomment to see sunset times
    // console.log(formatInTimeZone(sunsetUTCTime, jerusalemTZ, 'yyyy-MM-dd HH:mm zzz'))

    // How long before sunset does the new moon occur?
    const newMoonOccursXHoursBeforeSunset = (sunsetUTCTime - newMoonUTCTime) / 60 / 60 / 1000

    // Warn if the new moon time is close to sunset.
    if (Math.abs(newMoonOccursXHoursBeforeSunset) < 0.5) {
      console.log(`New moon (${formatInTimeZone(newMoonUTCTime, jerusalemTZ, 'yyyy-MM-dd HH:mm zzz')}) occurs within 30 minutes of sundown (${formatInTimeZone(sunsetUTCTime, jerusalemTZ, 'yyyy-MM-dd HH:mm zzz')})`)
    }

    if (newMoonOccursXHoursBeforeSunset < 0) {
      // If new moon happens after sunset, count it on the subsequent day
      newMoonAnyTimeZone.setDate(newMoonAnyTimeZone.getDate() + 1)

      // Check that incrementing the day will not result in a 31-day month
      const priorNewMoon = newMoons[newMoons.length - 1]
      if (priorNewMoon !== undefined) {
        const priorMonthLength = daysBetweenDates(priorNewMoon, newMoonAnyTimeZone)

        if (priorMonthLength > 30) {
          console.error(`Month beginning on ${priorNewMoonAnyTimeZone.toDateString()} and ending on ${newMoonAnyTimeZone.toDateString()} is longer than 30 days`)
        }
      }
    }

    newMoons.push(newMoonAnyTimeZone)
  }

  return newMoons
}
