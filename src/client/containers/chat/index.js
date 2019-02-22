import React from 'react';
import SharedWorker from 'sswc';
import {Button, message} from 'antd';

class Chat extends React.PureComponent {
  constructor(props) {
    super(props);
    this.worker = new SharedWorker({
      connected: this.connected,
    });
    this.worker.on('disconnect');
    this.state = {
      message: [],
      value: '',
      connected: false,
    };
  }

  componentWillUnmount() {
    if (this.worker) {
      this.worker.close();
    }
  }

  connected = () => {
    this.setState({ connected: true });
    this.worker.join('chat');
    this.worker.on('chat', ({ message }) => {
      this.setState({ message: [...this.state.message, message] });
    });
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleClick = () => {
    if (this.state.value) {
      this.worker.emit('chat', { channel: 'chat', message: this.state.value });
    }
  };

  render() {
    const { connected } = this.state;
    return (
      <div>
        <div>
          <input type='text' onChange={this.handleChange} />
          <button onClick={this.handleClick} disabled={!connected}>发送</button>
          <Button onClick={() => {
            message.success('show message');
          }}>message</Button>
        </div>
        {this.state.message.map((m, i) => (<p key={i}>{m}</p>))}
      </div>
    );
  }
}

export default Chat;
