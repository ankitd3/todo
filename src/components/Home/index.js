import React from 'react';
import { compose } from 'recompose';

import { withAuthorization } from '../Session';
import Messages from '../Messages';

const HomePage = () => (
  <div id="content">
    <h1>Manage your todo lists now: </h1>
    <Messages />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  //withEmailVerification,
  withAuthorization(condition),
)(HomePage);
