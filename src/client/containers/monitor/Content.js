import React from 'react';
import Info from './Info';
import OsChart from './OsChart';

class Content extends React.PureComponent {
  render() {
    const {prefix, overview, onStart, os} = this.props;
    return (
      <div className={`${prefix}-content`}>
        <Info prefix={prefix} overview={overview} onStart={onStart} />
        {Object.keys(os).map(k => {
          const arr = k.split('::');
          const data = os[k] || [];
          return (<OsChart server={arr[0]} pid={arr[1]} prefix={prefix} key={k} data={data} />);
        })}
      </div>
    )
  }
}
export default Content;
