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
import { findTimeZone, getZonedTime, getUnixTime } from 'timezone-support'

import { rawNewMoons } from './rawNewMoons.js'

const jerusalemTZ = findTimeZone('Asia/Jerusalem')
const loc = [31.79592425, 35.21198075969497];

const newMoons = []

for (const newMoonJerusalemTime of rawNewMoons) {
  // The Jerusalem new moon time must be in UTC so that suncalc will give us the sunset time for correct day
  const newMoonUTCTime = new Date(getUnixTime(newMoonJerusalemTime, jerusalemTZ))
  const { sunset: sunsetUTCTime } = suncalc.getTimes(newMoonUTCTime, loc[0], loc[1]);

  // console.log('The following sunset times have been calculated. Verify them against another source, like\n\nhttps://www.timeanddate.com/sun/israel/jerusalem?month=4&year=2032\n\nBe sure to check that the daylight savings change is accounted for properly as well.\n\n')
  // const jerusalemSunsetTime = getZonedTime(sunsetUTCTime, jerusalemTZ)
  // console.log(jerusalemSunsetTime)

  const newMoonOccursXHoursBeforeSunset = (sunsetUTCTime - newMoonUTCTime) / 60 / 60 / 1000

  if (Math.abs(newMoonOccursXHoursBeforeSunset) < 0.5) {
    const { year, month, day } = newMoonJerusalemTime
    console.log(`New moon occurs within 30 minutes of sundown on ${month}/${day}/${year} (Jerusalem Time)`)
  }

  if (newMoonOccursXHoursBeforeSunset < 0) {
    newMoonUTCTime.setDate(newMoonUTCTime.getDate() + 1)
  }

  // TODO: check lunar month has 29 or 30 days
  newMoons.push(newMoonUTCTime)
}

console.log('at the end', newMoons)
