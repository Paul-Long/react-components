import React from 'react';
import {Route} from 'react-router-dom';
import TableTab from '@containers/table';
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
    const {prefixCls} = this.props;
    return (
      <div className={`${prefixCls}`}>
        <Header className={`${prefixCls}-header`} menus={menus} />
        <div className={`${prefixCls}-content`}>
          <Route path='/table' component={TableTab} />
        </div>
      </div>
    )
  }
}

export default App;
