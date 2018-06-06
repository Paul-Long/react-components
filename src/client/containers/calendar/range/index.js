import React from 'react';
import Calendar, { PICKER_TYPE } from 'rcc-calendar';

class RangeDate extends React.PureComponent {
  render() {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <h2>基本</h2>
        <Calendar pickerType={PICKER_TYPE.RANGE} />
      </div>
    );
  }
}

export default RangeDate;
