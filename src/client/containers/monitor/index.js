import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import LeftMenu from './LeftMenu';
import Content from './Content';
import {message} from 'antd';
import './style.less';

class MonitorDemo extends React.PureComponent {
  static propTypes = {
    prefix: PropTypes.string
  };
  static defaultProps = {
    prefix: 'app-monitor'
  };
  state = {
    overview: null,
    os: {}
  };

  constructor(props) {
    super(props);
    this.axios = null;
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  fLoad = () => {
    const _this = this;
    this.axios = axios.create({
      baseURL: this.selected
    });
    this.axios.get('/anp-monitor/overview')
      .then(res => {
        _this.setState({overview: res.data})
      });
  };

  fOS = ({server, pid}) => {
    const _this = this;
    this.axios.post('/anp-monitor/os', {server, pid})
      .then(res => {
        const json = res.data;
        if (json.code === 0) {
          const data = json.data;
          const {server, pid} = data || {};
          const {os} = _this.state;
          const key = `${server}::${pid}`;
          if (!os[key]) os[key] = [];
          os[key].push(data);
          if (os[key].length > 300) {
            os[key] = os[key].splice(1);
          }
          os[key] = [...os[key]];
          _this.setState({os: {...os}});
        } else {
          if (json.error) {
            message.error(json.error);
          }
        }
      });
  };

  fChange = (key) => {
    this.selected = key;
    this.fLoad();
  };

  fStart = (payload) => {
    this.timer = setInterval(() => {
      const pids = payload.pids || [];
      pids.forEach(pid => {
        this[`f${payload.type}`]({server: payload.server, pid});
      });
    }, 1000);
  };

  render() {
    const {prefix} = this.props;
    const {overview, os} = this.state;
    return (
      <div className={prefix}>
        <LeftMenu prefix={prefix} onChange={this.fChange} />
        <Content prefix={prefix} overview={overview || {}} onStart={this.fStart} os={os} />
      </div>
    )
  }
}

export default MonitorDemo;
