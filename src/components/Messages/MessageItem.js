import React, { Component } from 'react';

class MessageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      completeMode: false,
      editText: this.props.message.text,
      stringi:''
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);

    this.setState({ editMode: false });
  };

  toggleComplete = () => {
    this.setState(state => ({
      completeMode: !state.completeMode,
    }));
    this.props.onCompleteMessage(this.props.message, this.state.completeMode);
  };

  render() {
    const { authUser, message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;
    // if(authUser.uid === message.userId){
    //   this.state.stringi+=message.text;
    //   console.log(this.state.stringi);
    // }
    
    return (
      <span>

        {authUser.uid === message.userId && (

          <li>
            {editMode ? (
              <input
                type="text"
                value={editText}
                onChange={this.onChangeEditText}
              />
            ) : (
              <p class={message.priority}>
                Timestamp: {message.createdAt}<p class={message.completed ? ('complete'): ('')}  onClick={this.toggleComplete}>{message.text} </p>
                {message.editedAt && <span> (Edited)</span>}
              </p>
            )}
        
            {editMode ? (
              <span>
                <button onClick={this.onSaveEditText}>Save</button>
                <button onClick={this.onToggleEditMode}>Reset</button>
              </span>
            ) : (
              <button onClick={this.onToggleEditMode}>Edit</button>
            )}

            {!editMode && (
              <button
                type="button"
                onClick={() => onRemoveMessage(message.uid)}
              >
                Delete
              </button>
            )}
          </li>
        )}
      </span>
    );
  }
}

export default MessageItem;
