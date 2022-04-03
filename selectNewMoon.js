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
import { formatSelectDate } from './dateHelpers'

import { allNewMoons, getStartEndDates } from './newMoonsState'

export class SelectNewMoon extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({mode: 'open'})

    const form = document.createElement('form')
    form.setAttribute('class', 'new-moon-date-picker')

    function handleSubmit (e) {
      e.preventDefault()
      const selectedTime = e.currentTarget['new-moon-select'].value

      const dateChangedEvent = new CustomEvent('date-changed', {
        bubbles: true,
        composed: true,
        detail: {
          startEndDates: getStartEndDates(selectedTime),
        }
      })
      this.dispatchEvent(dateChangedEvent)
    }

    form.onsubmit = handleSubmit

    const label = form.appendChild(document.createElement('label'))
    label.setAttribute('for', 'new-moon-select')
    label.innerHTML = 'Select first new moon of the year'

    const select = form.appendChild(document.createElement('select'))
    select.setAttribute('name', 'new-moon-select')
    select.setAttribute('class', 'new-moon-select')

    for (const newMoon of allNewMoons) {
      const option = select.appendChild(document.createElement('option'))
      option.value = newMoon.getTime()
      option.innerHTML = formatSelectDate(newMoon)
    }

    const input = form.appendChild(document.createElement('input'))
    input.setAttribute('type', 'submit')
    input.setAttribute('name', 'submit')
    input.setAttribute('value', 'Submit')

    const style = document.createElement('style')

    style.textContent = `
      .new-moon-select {
        margin: 0 4px;
      }
    `

    this.shadowRoot.append(style, form)
  }
}

customElements.define('select-new-moon', SelectNewMoon)
