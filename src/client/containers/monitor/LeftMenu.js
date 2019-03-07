import React from 'react';
import {Menu} from 'antd';
import hosts from './hosts';

class LeftMenu extends React.PureComponent {
  state = {
    select: null
  };
  fClick = ({key}) => {
    const {onChange} = this.props;
    this.setState({select: key});
    if (typeof onChange === 'function') {
      onChange(key);
    }
  };
  render() {
    const {select} = this.state;
    const {prefix} = this.props;
    return (
      <div className={`${prefix}-menu`}>
        <Menu mode='inline' theme='dark' selectedKeys={[select]} onClick={this.fClick}>
          {hosts.map(h => (<Menu.Item key={`${h.host}:${h.port}`}>{`${h.host}:${h.port}`}</Menu.Item>))}
        </Menu>
      </div>
    )
  }
}
export default LeftMenu;
