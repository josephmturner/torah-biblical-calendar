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
import fs from 'fs'
import readline from 'readline'
const file = readline.createInterface({
    input: fs.createReadStream('new_moons'),
    output: process.stdout,
    terminal: false
});
import suncalc from 'suncalc'
import { findTimeZone, getZonedTime, getUnixTime } from 'timezone-support'

const newMoonDates = {};

file.on('line', (line) => {
  const [yearStr, monthStr, dayStr, hoursStr, minutesStr] = line.split('\t')

  const year = Number(yearStr)
  const month = Number(monthStr)
  const day = Number(dayStr)
  const hours = Number(hoursStr)
  const minutes = Number(minutesStr)

  // Convert from jerusalem time to UTC in order to get the correct sunset time for the day
  // Probably not necessary to convert timezones at the beginning since sunset times only change by <1min each day
  const jerusalemNewMoonTime = { year, month, day, hours, minutes }
  const jerusalemTZ = findTimeZone('Asia/Jerusalem')
  const newMoonUTCDate = new Date(getUnixTime(jerusalemNewMoonTime, jerusalemTZ))

  const loc = [31.79592425,35.21198075969497];
  const { sunset } = suncalc.getTimes(newMoonUTCDate, loc[0], loc[1]);

  // Convert calculated sunset times to Jerusalem TZ to verify them against (check daylight savings change happens properly too)
  // https://www.timeanddate.com/sun/israel/jerusalem?month=4&year=2032
  // const jerusalemSunsetTime = getZonedTime(sunset, jerusalemTZ)
  // console.log(jerusalemSunsetTime)

  const newMoonOccursXHoursBeforeSunset = (sunset - newMoonUTCDate) / 60 / 60 / 1000

  if (Math.abs(newMoonOccursXHoursBeforeSunset) > 24) throw new Error('New moon and sunset times were off by more than 24 hours.')
  if (Math.abs(newMoonOccursXHoursBeforeSunset) < 0.5) console.log(`New moon occurs within 30 minutes of 12 hours before sundown on ${newMoonUTCDate.getMonth() + 1}/${newMoonUTCDate.getDate()}/${newMoonUTCDate.getFullYear()}`)

  if (newMoonDates[year] === undefined) newMoonDates[year] = []
  if (newMoonOccursXHoursBeforeSunset > 12) {
    newMoonDates[year].push(newMoonUTCDate)
  } else {
    newMoonUTCDate.setDate(newMoonUTCDate.getDate() + 1)
    newMoonDates[year].push(newMoonUTCDate)
  }
});

file.on('close', () => {
  console.log('at the end', newMoonDates)
});
