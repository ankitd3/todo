import React from 'react';

const Landing = () => (
  <div id="content">

    <h2>Welcome!</h2>

    <p>You may :
      <ul>
        <li>Add</li>
        <li>Delete</li>
        <li class='complete'>Mark complete: by Clicking on the message text</li>
        <li>Edit</li>
    <li>Rank your todos:</li>
    <ul>
        <li class='High'>Red: High priority</li>
        <li class='Medium'>Orange: Med priority</li>
        <li class='Low'>Gree: Low priority</li>
      </ul>
      </ul>

      (Also, click on "more" to load all the todos)</p>
  </div>
);

export default Landing;
