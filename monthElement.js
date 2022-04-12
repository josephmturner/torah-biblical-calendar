/*
  Copyright (C) 2022 by Joseph Turner

  biblical-lunisolar-calendar is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  biblical-lunisolar-calendar is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with biblical-lunisolar-calendar.  If not, see <https://www.gnu.org/licenses/>.
*/
import { addDays, daysBetweenDates, formatCalendarDate } from './dateHelpers'

const monthNames = ['Aviv (Nisan)', 'Ziv (Iyyar)', 'Sivan', 'Tammuz', 'Av (Ab)', 'Elul', 'Ethanim (Tishrei)', 'Bul (Cheshavan)', 'Kislev (Chislev)', 'Tevet (Tebeth)', 'Shevat', 'Adar I']
const gregorianMonthNames = ['March/April', 'April/May', 'May/June', 'June/July', 'July/August', 'August/September', 'September/October', 'October/November', 'November/December', 'December/January', 'January/February', 'February/March']

const monthTemplate = `
  <table>
    <thead>
      <tr>
        <th class="day1">1st day</th>
        <th colspan="6" class="month-header">
          <span class="hebrew-name"></span>
          <span>-</span>
          <span class="english-name"></span>
        </th>
      </tr>
    </thead>
    <thead>
      <tr>
        <th>7th day</th>
        <th>6th day</th>
        <th>5th day</th>
        <th>4th day</th>
        <th>3rd day</th>
        <th>2nd day</th>
        <th>1st day</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="day8">8</td>
        <td class="day7">7</td>
        <td class="day6">6</td>
        <td class="day5">5</td>
        <td class="day4">4</td>
        <td class="day3">3</td>
        <td class="day2">2</td>
      </tr>
      <tr></tr>
      <tr>
        <td class="day15">15</td>
        <td class="day14">14</td>
        <td class="day13">13</td>
        <td class="day12">12</td>
        <td class="day11">11</td>
        <td class="day10">10</td>
        <td class="day9">9</td>
      </tr>
      <tr>
        <td class="day22">22</td>
        <td class="day21">21</td>
        <td class="day20">20</td>
        <td class="day19">19</td>
        <td class="day18">18</td>
        <td class="day17">17</td>
        <td class="day16">16</td>
      </tr>
      <tr>
        <td class="day29">29</td>
        <td class="day28">28</td>
        <td class="day27">27</td>
        <td class="day26">26</td>
        <td class="day25">25</td>
        <td class="day24">24</td>
        <td class="day23">23</td>
      </tr>
      <tr class="last">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="day30">30</td>
      </tr>
    </tbody>
  </table>
`

export class Month extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = monthTemplate
    this._startEndDate = null
  }

  get startEndDate() {
    return this._startEndDate
  }

  set startEndDate( val ) {
    if ( val !== this._startEndDate ) {
      this._startEndDate = val
      this.render()
    }
  }

  render() {
    const monthHeaderHebrew = this.querySelector('.hebrew-name')
    const monthHeaderEnglish = this.querySelector('.english-name')
    const monthIndex = this.getAttribute('month')
    monthHeaderHebrew.innerText = monthNames[monthIndex - 1]
    monthHeaderEnglish.innerText = gregorianMonthNames[monthIndex - 1]


    this.querySelector('.day1').classList.toggle('new-moon', true)

    for (const i of [8, 15, 22, 29]) {
      this.querySelector('.day' + i).classList.toggle('sabbath', true)
    }

    if (monthIndex == 1) {
      this.querySelector('.day14').classList.toggle('passover', true)
      this.querySelector('.day15').classList.toggle('half-day', true)
      for (const i of [15, 17, 18, 19, 20, 21]) {
        this.querySelector('.day' + i).classList.toggle('unleavened-bread', true)
      }
      this.querySelector('.day16').classList.toggle('wave-sheaves', true)
    }

    if (monthIndex == 3) {
      this.querySelector('.day6').classList.toggle('pentecost', true)
    }

    if (monthIndex == 7) {
      this.querySelector('.day1').classList.toggle('trumpets', true)
      this.querySelector('.day1').classList.toggle('sabbath', false)
      this.querySelector('.day10').classList.toggle('passover', true)
      this.querySelector('.day15').classList.toggle('half-day', true)
      this.querySelector('.day22').classList.toggle('half-day', true)
      for (const i of [15, 16, 17, 18, 19, 20, 21, 22]) {
        this.querySelector('.day' + i).classList.toggle('tabernacles', true)
      }
      this.querySelector('.day16').classList.toggle('wave-sheaves', true)
    }

    if (this.startEndDate !== null) {
      if (monthIndex == 12) {
        this.querySelector('.last').innerHTML = `
        <td class="next new-moon">1</td>
        <td colspan="5">
          <span class="possible-adar-ii">New year or Adar II begins </span>
        </td>
        <td class="day30">30</td>
`
        console.log(this.querySelector('.next.new-moon'))

        this.querySelector(".next.new-moon").innerText = '1\n' + formatCalendarDate(addDays(this.startEndDate.end, 1))
      }

      const monthLength = daysBetweenDates(this.startEndDate.start, this.startEndDate.end) + 1
      for (let i = 1; i <= monthLength; i++) {
        const cell = this.querySelector('.day' + i)
        cell.innerText = i + '\n' + formatCalendarDate(addDays(this.startEndDate.start, i - 1))
      }

      if (monthLength === 29) {
        const day30Cell = this.querySelector('.day' + 30)
        day30Cell.innerHTML = ''
      }
    }
  }

  connectedCallback () {
    this.render()
  }
}

customElements.define('month-element', Month)
