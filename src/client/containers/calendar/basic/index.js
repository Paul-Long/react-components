import React from 'react';
import Calendar, { CalendarType } from 'rcc-calendar';

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
        <Calendar calendarType={CalendarType.ICON} />
      </div>
    );
  }
}

export default Basic;
