import React from 'react';
import Calendar, { CALENDAR_TYPE } from 'rcc-calendar';
import moment from 'moment';

class Basic extends React.PureComponent {
  _oneYear = moment().subtract(1, 'M');
  disabledDate = (current, today) => {
    return current && current.isBefore(this._oneYear);
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
        <Calendar />
        <h2>Icon Calendar</h2>
        <Calendar calendarType={CALENDAR_TYPE.ICON} />
        <h2>Disabled Calendar</h2>
        <Calendar disabledDate={this.disabledDate} />
      </div>
    );
  }
}

export default Basic;
