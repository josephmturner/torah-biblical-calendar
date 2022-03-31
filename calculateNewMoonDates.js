/*
  Copyright (C) 2022 by Joseph Turner

  calculate-new-moon-dates is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  calculate-new-moon-dates is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with calculate-new-moon-dates.  If not, see <https://www.gnu.org/licenses/>.
*/
import suncalc from 'suncalc'
import { findTimeZone, getUnixTime } from 'timezone-support'
// import { getZonedTime } from 'timezone-support'

import { rawNewMoons } from './rawNewMoons.js'

const jerusalemTZ = findTimeZone('Asia/Jerusalem')
const loc = [31.79592425, 35.21198075969497];

const newMoons = []

for (const newMoonJerusalemTime of rawNewMoons) {
  const { year, month, day } = newMoonJerusalemTime

  // The Jerusalem new moon time must be in UTC so that suncalc will give us the sunset time for correct day
  const newMoonUTCTime = new Date(getUnixTime(newMoonJerusalemTime, jerusalemTZ))
  const { sunset: sunsetUTCTime } = suncalc.getTimes(newMoonUTCTime, loc[0], loc[1]);

  // console.log('The following sunset times have been calculated. Verify them against another source, like\n\nhttps://www.timeanddate.com/sun/israel/jerusalem?month=4&year=2032\n\nBe sure to check that the daylight savings change is accounted for properly as well.\n\n')
  // const jerusalemSunsetTime = getZonedTime(sunsetUTCTime, jerusalemTZ)
  // console.log(jerusalemSunsetTime)

  const newMoonOccursXHoursBeforeSunset = (sunsetUTCTime - newMoonUTCTime) / 60 / 60 / 1000

  if (Math.abs(newMoonOccursXHoursBeforeSunset) < 0.5) {
    console.log(`New moon occurs within 30 minutes of sundown on ${month}/${day}/${year} (Jerusalem Time)`)
  }

  // Because Date can't handle locales other than the current one,
  // we must create a new Date object (with the current locale)
  // and use that in the daysBetweenDates function.
  // Additionally, having the date in date format makes it easier to increment the date around month and year boundaries
  const newMoonTimeInLocale = new Date(year, month - 1, day)
  if (newMoonOccursXHoursBeforeSunset < 0) {
    // If new moon happens after sunset, count it on the subsequent day
    newMoonTimeInLocale.setDate(newMoonTimeInLocale.getDate() + 1)

    // Check that incrementing the day will not result in a 31-day month
    const priorNewMoon = newMoons[newMoons.length - 1]
    if (priorNewMoon !== undefined) {
      const { year: priorYear, month: priorMonth, day: priorDay } = priorNewMoon
      const priorNewMoonTimeInLocale = new Date(priorYear, priorMonth - 1, priorDay)

      const priorMonthLength = daysBetweenDates(priorNewMoonTimeInLocale, newMoonTimeInLocale)

      if (priorMonthLength > 30) {
        console.error(`Month beginning on ${priorNewMoonTimeInLocale.toDateString()} and ending on ${newMoonTimeInLocale.toDateString()} is longer than 30 days`)
      }
    }
  }

  newMoons.push({
    year: newMoonTimeInLocale.getFullYear(),
    month: newMoonTimeInLocale.getMonth() + 1,
    day: newMoonTimeInLocale.getDate()
  })
}

console.log(newMoons)

// Based on https://stackoverflow.com/a/40975730
function daysBetweenDates(earlierDate, laterDate){
  return (Date.UTC(laterDate.getFullYear(), laterDate.getMonth(), laterDate.getDate()) - Date.UTC(earlierDate.getFullYear(), earlierDate.getMonth(), earlierDate.getDate())) / 24 / 60 / 60 / 1000;
}
