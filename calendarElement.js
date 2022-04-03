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
export { Month } from './monthElement'
export { SelectNewMoon } from './selectNewMoon'
import { getStartEndDates } from './newMoonsState'

export class Calendar extends HTMLElement {
  constructor() {
    super()

    this.startEndDates = getStartEndDates()

    for (let i = 1; i < 13; i++) {
      const month = this.querySelector(`month-element[month='${i}']`)
      month.startEndDate = this.startEndDates[i]
    }

    this.addEventListener('date-changed', (event) => {
      this.startEndDates = event.detail.startEndDates

      const calendarTitle = this.querySelector('h1')
      const selectedYear = this.startEndDates[1].start.getFullYear()
      calendarTitle.innerHTML += ` (${selectedYear}-${selectedYear + 1})`

      for (let i = 1; i < 13; i++) {
        const month = this.querySelector(`month-element[month='${i}']`)
        month.startEndDate = this.startEndDates[i]
      }
    })
  }
}

customElements.define('calendar-element', Calendar)
