import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import MessageList from './MessageList';

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      emailBody:'',
      email_id:'',
      priority: 'High',
      loading: false,
      messages: [],
      limit: 10,
    };
  }

  componentDidMount() {
    this.onListenForMessages();
  }

  onListenForMessages = () => {
    this.setState({ loading: true });

    this.props.firebase
      .messages()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', snapshot => {
        const messageObject = snapshot.val();

        if (messageObject) {
          const messageList = Object.keys(messageObject).map(key => ({
            ...messageObject[key],
            uid: key,
          }));

          this.setState({
            messages: messageList,
            loading: false,
          });

        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onChangePriority = event => {
    this.setState({ priority: event.target.value });
  };

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().push({
      text: this.state.text,
      priority: this.state.priority,
      completed: false,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ text: '' });
    this.setState({ priority: 'High' });


    event.preventDefault();
  };

  onCompleteMessage = (message, completed) => {
    const { uid, ...messageSnapshot } = message;

    this.props.firebase.message(message.uid).set({
      ...messageSnapshot,
      completed,
    });
  };

  onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;

    this.props.firebase.message(message.uid).set({
      ...messageSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForMessages,
    );
  };

  sendEmail = async (event,authUser) => {
        event.preventDefault();


        let body='<p>'+this.state.emailBody+'  \n\nTodos:\n';

        let i;
        for(i in this.state.messages){
          if(this.state.messages[i].userId===authUser.uid){
            body+='Timestamp: '+this.state.messages[i].createdAt.toString()+' Description: '+this.state.messages[i].text+';\n';
          }
        }
        body+='</p>';

        const msg = {
          to: this.state.email_id,
          from: 'ankit@g.com',
          subject: 'Todos',
          templateId: 'd-b6338634ada249da9e5d3e06c06c0541',
          substitutionWrappers: ['{{','}}'],
          substitutions: {
            name: 'Ankit',
          },
          text: body,
        };

        console.log(msg);

        //console.log(https://us-central1-todo-8a53f.cloudfunctions.net/sendMail?dest=ankit.dalal0201@gmail.com,sub='test',html=<p>Test</p>)

    };

  render() {
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && messages && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {messages && (
              <MessageList
                authUser={authUser}
                messages={messages}
                onEditMessage={this.onEditMessage}
                onCompleteMessage={this.onCompleteMessage}
                onRemoveMessage={this.onRemoveMessage}
              />
            )}

            {!messages && <div>There are no messages ...</div>}

            <form
              onSubmit={event =>
                this.onCreateMessage(event, authUser)
              }
            >
              <input
                type="text"
                value={text}
                onChange={this.onChangeText}
                placeholder='Enter todo description'
              />
              <label>Select Priority</label>
              <select name="priority" onChange={this.onChangePriority}>
                  <option value="High" selected>High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
              </select>

              <button type="submit">Add todos</button>
            </form>

            <hr></hr>

            <form
              onSubmit={event =>
                this.sendEmail(event, authUser)
              }
            >
              <input
                type="text"
                name="emailBody"
                value={this.state.emailBody}
                onChange={event => this.setState({emailBody: event.target.value})}
                placeholder='Enter email body'
              />
              <input
                type="text"
                name="email_id"
                value={this.state.email_id}
                onChange={event => this.setState({email_id: event.target.value})}
                placeholder='Enter email_id'
              />

              <button type="submit">Send Email</button>
            </form>


          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Messages);
