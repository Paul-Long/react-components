import React from 'react';
import {Divider} from 'antd';
import echarts from 'echarts';
import moment from 'moment';

class OsChart extends React.Component {
  constructor(props) {
    super(props);
    this.timeData = [];
    this.cpuData = [];
    this.memoryHeapTotal = [];
    this.memoryHeapUsed = [];
    this.memoryRss = [];
  }

  componentDidMount() {
    this.cpuChart = echarts.init(this.cpu);
    this.memoryChart = echarts.init(this.memory);
    this.fData();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.fData(nextProps);
    }
  }
  shouldComponentUpdate() {
    return false;
  }
  fData = (props = this.props) => {
    const data = (props.data || []);
    this.timeData = [];
    this.cpuData = [];
    this.memoryHeapTotal = [];
    this.memoryHeapUsed = [];
    this.memoryRss = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const cpu = item.cpu || {};
      this.timeData.push(item.time);
      this.cpuData.push(Number(((cpu.user + cpu.sys) * 100).toFixed(2)));
      const memory = item.memory || {};
      this.memoryHeapTotal.push(Number((memory.heapTotal / (1024 * 1024)).toFixed(2)));
      this.memoryHeapUsed.push(Number((memory.heapUsed / (1024 * 1024)).toFixed(2)));
      this.memoryRss.push(Number((memory.rss / (1024 * 1024)).toFixed(2)));
    }

    if (data.length < 300) {
      this.timeData = this.timeData.reverse();
      this.cpuData = this.cpuData.reverse();
      this.memoryHeapTotal = this.memoryHeapTotal.reverse();
      this.memoryHeapUsed = this.memoryHeapUsed.reverse();
      this.memoryRss = this.memoryRss.reverse();
      for (let i = 0; i < 300 - data.length; i++) {
        this.timeData.push(null);
        this.cpuData.push(null);
        this.memoryHeapTotal.push(null);
        this.memoryHeapUsed.push(null);
        this.memoryRss.push(null);
      }
      this.timeData = this.timeData.reverse();
      this.cpuData = this.cpuData.reverse();
      this.memoryHeapTotal = this.memoryHeapTotal.reverse();
      this.memoryHeapUsed = this.memoryHeapUsed.reverse();
      this.memoryRss = this.memoryRss.reverse();
    }
    this.fOption();
  };

  fOption = () => {
    this.cpuChart.setOption({
      title: {show: true, text: 'CPU'},
      legend: {data: [{name: 'CPU', icon: 'rect'}]},
      xAxis: {
        type: 'category',
        data: this.timeData,
        show: false,
        boundaryGap: false
      },
      tooltip : {
        trigger: 'axis',
        formatter: function (params) {
          const item = params[0];
          if (!item.axisValue || !item.value) {
            return '';
          }
          const date = moment(item.axisValue).format('HH:mm:ss');
          return `${date} <br /> ${item.marker}CPU: ${item.value}%`;
        }
      },
      grid: {left: 50, right: 10},
      yAxis: {
        type: 'value'
      },
      series: [{
        name: 'CPU',
        data: this.cpuData,
        type: 'line',
        lineStyle: {width: 1},
        areaStyle: {},
      }]
    }, true);

    this.memoryChart.setOption({
      title: {show: true, text: 'Memory'},
      grid: {left: 50, right: 10},
      xAxis: {
        type: 'category',
        data: this.timeData,
        show: false,
        boundaryGap: false
      },
      legend: {data: [{name: 'HeapTotal', icon: 'rect'}, {name: 'HeapUsed', icon: 'rect'}, {name: 'Rss', icon: 'rect'}], right: 0},
      tooltip : {
        trigger: 'axis',
        formatter: function (params) {
          const item0 = params[0];
          const item1 = params[1];
          const item2 = params[2];
          if (!item0.axisValue || !item0.value) {
            return '';
          }
          const date = moment(item0.axisValue).format('HH:mm:ss');
          return `${date} 
<br /> ${item0.marker}${item0.seriesName}: ${item0.value} MB
<br /> ${item1.marker}${item1.seriesName}: ${item1.value} MB
<br /> ${item2.marker}${item2.seriesName}: ${item2.value} MB
`
        }
      },
      yAxis: {
        type: 'value',
      },
      series: [{
        name: 'HeapTotal',
        data: this.memoryHeapTotal,
        type: 'line',
        lineStyle: {width: 1},
        areaStyle: {},
      },{
        name: 'HeapUsed',
        data: this.memoryHeapUsed,
        type: 'line',
        lineStyle: {width: 1},
        areaStyle: {},
      },{
        name: 'Rss',
        data: this.memoryRss,
        type: 'line',
        lineStyle: {width: 1},
        areaStyle: {},
      }]
    }, true);
  };

  saveRef = (name) => (ele) => this[name] = ele;

  render() {
    const {prefix, server, pid} = this.props;
    return (
      <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
        <Divider orientation='left'><span style={{fontSize: 18}}>{server}</span>:<span style={{fontSize: 14}}>{pid}</span></Divider>
        <div className={`${prefix}-os-chart`}>
          <div ref={this.saveRef('cpu')} style={{width: 360, height: 300}} />
          <div ref={this.saveRef('memory')} style={{width: 360, height: 300}} />
        </div>
      </div>
    )
  }
}
export default OsChart;
