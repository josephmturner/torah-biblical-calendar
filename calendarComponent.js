// adapted from https://www.geeksforgeeks.org/design-a-calendar-using-html-and-css/
const calendarTemplate = `
  <h2 class="month" align="center">
    January 2021
  </h2>
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
        <td>8</td>
        <td>7</td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
      </tr>
      <tr></tr>
      <tr>
        <td>15</td>
        <td>14</td>
        <td>13</td>
        <td>12</td>
        <td>11</td>
        <td>10</td>
        <td>9</td>
      </tr>
      <tr>
        <td>22</td>
        <td>21</td>
        <td>20</td>
        <td>19</td>
        <td>18</td>
        <td>17</td>
        <td>16</td>
      </tr>
      <tr>
        <td>29</td>
        <td>28</td>
        <td>27</td>
        <td>26</td>
        <td>25</td>
        <td>24</td>
        <td>23</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>30</td>
      </tr>
    </tbody>
  </table>
`;

export class Calendar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = calendarTemplate;
  }

  // Whenever an attibute is changed, this function is called. A switch statement is a good way to handle the various attributes.
  // Note that this also gets called the first time the attribute is set, so we do not need any special initialisation code.
  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'month':
        this.querySelector('.month').innerText = newValue;
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

  // We need to specify which attributes will be watched for changes. If an attribute is not included here, attributeChangedCallback will never be called for it
  static get observedAttributes() {
    return ['month', 'profile-photo', 'message-text', 'time'];
  }
}

// Now that our class is defined, we can register it
customElements.define('calendar-element', Calendar);
