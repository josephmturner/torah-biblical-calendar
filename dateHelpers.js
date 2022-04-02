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
import { format } from 'date-fns'

export const addDays = (dateObj, days = 1) => {
  const result = new Date(dateObj);
  result.setDate(result.getDate() + days);
  return result;
};

// Based on https://stackoverflow.com/a/40975730
export function daysBetweenDates(earlierDate, laterDate){
  return (Date.UTC(laterDate.getFullYear(), laterDate.getMonth(), laterDate.getDate()) - Date.UTC(earlierDate.getFullYear(), earlierDate.getMonth(), earlierDate.getDate())) / 24 / 60 / 60 / 1000;
}

export function formatCalendarDate (dateObj) {
  const pattern = 'iii M-d'
  return format(dateObj, pattern)
}
