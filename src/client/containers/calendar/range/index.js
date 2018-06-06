import React from 'react';
import Calendar, { PickerType } from 'rcc-calendar';

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
        <Calendar pickerType={PickerType.RANGE} />
      </div>
    );
  }
}

export default RangeDate;
