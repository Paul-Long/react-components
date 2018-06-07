import React from 'react';
import Calendar, { PICKER_TYPE } from 'rcc-calendar';
import moment from 'moment';

class RangeDate extends React.PureComponent {
  _start = moment().subtract(1, 'M');
  _end = moment().add(1, 'M');
  disabledDate = (current, today) => {
    return (current && current.isBefore(this._start)) || (current && current.isAfter(this._end));
  };
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
        <h2>Disabled Range Calendar</h2>
        <Calendar pickerType={PICKER_TYPE.RANGE} disabledDate={this.disabledDate} />
      </div>
    );
  }
}

export default RangeDate;
