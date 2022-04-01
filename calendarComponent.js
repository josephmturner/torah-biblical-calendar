const monthNames = ["Aviv (Nisan)", "Ziv (Iyyar)", "Sivan", "Tammuz", "Av (Ab)", "Elul", "Ethanim (Tishrei)", "Bul (Cheshavan)", "Kislev (Chislev)", "Tevet (Tebeth)", "Shevat", "Adar I"]
const gregorianMonthNames = ["March/April", "April/May", "May/June", "June/July", "July/August", "August/September", "September/October", "October/November", "November/December", "December/January", "January/February", "February/March"]
const newMoonIndex = ["(1st New Moon)", "(2nd New Moon)", "(3rd New Moon)", "(4th New Moon)", "(5th New Moon)", "(6th New Moon)", "(7th New Moon)", "(8th New Moon)", "(9th New Moon)", "(10th New Moon)", "(11th New Moon)", "(12th New Moon)"]

const calendarTemplate = `
  <h2 class="month" align="center"></h2>
  <table align="center">
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
      <tr>
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
`;

export class Calendar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = calendarTemplate;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'month':
        this.querySelector('.month').innerText = monthNames[newValue - 1];
        this.querySelector('.month').innerText += '\n' + gregorianMonthNames[newValue - 1];
        this.querySelector('.message').classList.toggle('self', newValue === 'Me');
        break;

      case 'profile-photo':
        this.querySelector('.profile-photo').setAttribute('src', newValue);
        break;
      case 'message-text':
        this.querySelector('.message-text').innerText = newValue;
        break;
      case 'time':
        this.querySelector('time').innerText = newValue;
        break;
    }
  }

  static get observedAttributes() {
    return ['month', 'profile-photo', 'message-text', 'time'];
  }
}

customElements.define('calendar-element', Calendar);
