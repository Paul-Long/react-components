import React from 'react';
import { Route } from 'react-router-dom';
import TableTab from '@containers/table';
import CalendarTab from '@containers/calendar';
import ChatTab from '@containers/chat';
import Header from '@components/header';
import menus from './menus';
import './app.less';

type AppProps = {
  prefixCls: string
}

class App extends React.Component<AppProps> {
  static defaultProps = {
    prefixCls: 'app'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}`}>
        <Header className={`${prefixCls}-header`} menus={menus} githubIcon />
        <div className={`${prefixCls}-content`}>
          <Route path='/table' component={TableTab} />
          <Route path='/calendar' component={CalendarTab} />
          <Route path='/chat' component={ChatTab} />
        </div>
      </div>
    );
  }
}

export default App;
