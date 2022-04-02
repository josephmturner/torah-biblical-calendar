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
export { Month } from './monthComponent'
export { SelectNewMoon } from './selectNewMoon'
import { getStartEndDates } from './newMoonsState'

export class Calendar extends HTMLElement {
  constructor() {
    super()

    this.startEndDates = getStartEndDates()

    // const shadow = this.attachShadow({mode: 'open'})

    for (let i = 1; i < 13; i++) {
      // const month = this.querySelector('month-element.month' + i)
      const month = this.querySelector(`month-element[month='${i}']`)
      // console.log(this.querySelector(`month-element[month='${i}']`))

      month.startEndDate = this.startEndDates[i]
    }


    // console.log(this)
    this.addEventListener('date-changed', (event) => {
      this.startEndDates = event.detail.startEndDates
      // console.log('date-changed got it here!', date)

      for (let i = 1; i < 13; i++) {
        // const month = this.querySelector('month-element.month' + i)
        const month = this.querySelector(`month-element[month='${i}']`)
        // console.log(this.querySelector(`month-element[month='${i}']`))

        month.startEndDate = this.startEndDates[i]
      }




      // while (this.querySelector('.month')) {
      //   document.remove(this.querySelector('.month'))
      // }

      // this.querySelector('').amount = amount;
    })

    const p = document.createElement('p')
    p.innerHTML = 'p'
    // this.appendChild(p)
    // shadow.appendChild(document.createElement('p'))
    // shadow.appendChild(document.createElement('month-element').cloneNode())
  }

  static get observedAttributes() {
    return ['month']
  }
}

customElements.define('calendar-element', Calendar)
