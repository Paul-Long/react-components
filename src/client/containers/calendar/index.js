import React from 'react';
import { Route } from 'react-router-dom';
import Header from '@components/header';
import menus from './menus';
import BasicCalendar from './basic';
import RangeCalendar from './range';
import './calendar.less';

type Props = {
  prefixCls: string
}

class Calendar extends React.PureComponent<Props> {
  static defaultProps = {
    prefixCls: 'app-c'
  };

  constructor(props) {
    super(props);
    const pathname = props.location.pathname;
    const history = props.history;
    const match = props.match || {};
    if (match.isExact && pathname === '/calendar') {
      history.push('/calendar/Basic');
    }
  }

  render() {
    const { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}`}>
        <Header className={`${prefixCls}-header`} menus={menus} />
        <div className={`${prefixCls}-content`}>
          <Route path='/calendar/Basic' component={BasicCalendar} />
          <Route path='/calendar/Range' component={RangeCalendar} />
        </div>
      </div>
    );
  }
}

export default Calendar;
