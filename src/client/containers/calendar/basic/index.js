import React from 'react';
import Calendar, { CALENDAR_TYPE } from 'rcc-calendar';

class Basic extends React.PureComponent {
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
      </div>
    );
  }
}

export default Basic;
