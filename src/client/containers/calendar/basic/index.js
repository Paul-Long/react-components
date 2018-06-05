import React from 'react';
import Calendar, { CalendarType } from 'rcc-calendar';

class Basic extends React.PureComponent {
  render() {
    return (
      <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Calendar />
        <Calendar calenderType={CalendarType.ICON} />
      </div>
    );
  }
}

export default Basic;
