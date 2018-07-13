import React from 'react';
import { Route } from 'react-router-dom';
import Header from '@components/header';
import BasicTable from './basic';
import FixedHeaderTable from './fixed-header';
import FixedHeaderAndColumnTable from './fixed-header-column';
import TableAll from './all';
import FixedRowTable from './fixed-row';
import RowEvent from './row-event';
import menus from './menus';
import './table.less';

type Props = {
  prefixCls: string
}

class TableTab extends React.Component<Props> {
  static defaultProps = {
    prefixCls: 'app-t'
  };

  constructor(props) {
    super(props);
    const history = props.history;
    const match = props.match || {};
    if (match.isExact) {
      history.push('/table/Basic');
    }
  }

  connected = () => {
    this.worker.on('');
  };

  render() {
    const { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}`}>
        <Header className={`${prefixCls}-header`} menus={menus} />
        <div className={`${prefixCls}-content`}>
          <Route path='/table/Basic' component={BasicTable} />
          <Route path='/table/FixedHeader' component={FixedHeaderTable} />
          <Route path='/table/FixedHeaderAndColumn' component={FixedHeaderAndColumnTable} />
          <Route path='/table/all' component={TableAll} />
          <Route path='/table/FixedRow' component={FixedRowTable} />
          <Route path='/table/RowEvent' component={RowEvent} />
        </div>
      </div>
    );
  }
}

export default TableTab;
