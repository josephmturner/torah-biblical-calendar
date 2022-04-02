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

import { calculateNewMoons } from './calculateNewMoons'

export class SelectNewMoon extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});

    const form = document.createElement('form')
    form.setAttribute('class', 'new-moon-date-picker')

    const label = form.appendChild(document.createElement('label'))
    label.setAttribute('for', 'new-moon-select')
    label.innerHTML = 'Select first new moon of the year'

    const select = form.appendChild(document.createElement('select'))
    select.setAttribute('name', 'new-moon-select')
    select.setAttribute('id', 'new-moon-select')

    for (const newMoon of calculateNewMoons()) {
      const option = select.appendChild(document.createElement("option"))
      option.innerHTML = formatSelectDate(newMoon)
    }

    const input = form.appendChild(document.createElement('input'))
    input.setAttribute('type', 'button')
    input.setAttribute('name', 'submit')
    input.setAttribute('value', 'Submit')

    this.shadowRoot.append(form);
  }
}

customElements.define('select-new-moon', SelectNewMoon);
