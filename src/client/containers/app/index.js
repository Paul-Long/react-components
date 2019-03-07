import React from 'react';
import { Route } from 'react-router-dom';
import TableTab from '@containers/table';
import CalendarTab from '@containers/calendar';
import ChatTab from '@containers/chat';
import TreeTab from '@containers/tree';
import CheckboxTab from '@containers/checkbox';
import TriggerTab from '@containers/trigger';
import MonitorTab from '@containers/monitor';
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
          <Route path='/tree' component={TreeTab} />
          <Route path='/checkbox' component={CheckboxTab} />
          <Route path='/trigger' component={TriggerTab} />
          <Route path='/monitor' component={MonitorTab} />
        </div>
      </div>
    );
  }
}

export default App;
