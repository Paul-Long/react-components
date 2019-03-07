import React from 'react';
import {Button, Select, Radio, Divider} from 'antd';

class Info extends React.PureComponent {
  state = {
    selected: null,
    type: 'OS',
    pid: 'ALL'
  };

  componentDidMount() {
    const keys = Object.keys(this.props.overview);
    if (!this.state.selected && keys.length > 0) {
      this.setState({selected: keys[0]});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.overview !== this.props.overview) {
      const keys = Object.keys(nextProps.overview);
      if (!this.state.selected && keys.length > 0) {
        this.setState({selected: keys[0]});
      }
    }
  }

  fChange = (key) => (event) => {
    this.setState({[key]: event.target.value});
  };

  fStart = () => {
    const {selected, pid, type} = this.state;
    const {overview, onStart} = this.props;
    const pids = overview[selected] || [];
    const payload = {server: selected, type};
    if (pid === 'ALL') {
      payload.pids = pids;
    } else {
      payload.pids = [pid];
    }
    if (typeof onStart === 'function') {
      onStart(payload);
    }
  };

  render() {
    const {selected, type, pid} = this.state;
    const {prefix, overview} = this.props;
    const keys = Object.keys(overview);
    const pids = overview[selected] || [];
    const hasPid = pids.length > 0;
    return (
      <div className={`${prefix}-info`}>
        <Divider orientation='left'>所在服务器 <Button onClick={this.fStart} disabled={!hasPid}>Start</Button></Divider>
        <Select className={`${prefix}-select`} value={this.state.selected}>
          {keys.map(k => <Select.Option key={k}>{k}</Select.Option>)}
        </Select>
        {hasPid && <Divider orientation='left'>选择进程</Divider>}
        {hasPid && <Radio.Group value={pid} onChange={this.fChange('pid')}>
          <Radio key='ALL' value='ALL'>ALL</Radio>
          {pids.map(p => (<Radio key={p} value={p}>{p}</Radio>))}
        </Radio.Group>}
        {hasPid && <Divider orientation='left'>解析类型</Divider>}
        {hasPid && <Radio.Group value={type} onChange={this.fChange('type')}>
          <Radio key='OS' value='OS'>OS</Radio>
          <Radio key='CPU' value='CPU'>CPU</Radio>
        </Radio.Group>}
      </div>
    )
  }
}

export default Info;
