import React from 'react';
import Calendar, {PickerType} from 'rcc-calendar';

class RangeDate extends React.PureComponent {
  render() {
    return (
      <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Calendar pickerType={PickerType.RANGE} />
      </div>
    );
  }
}
export default RangeDate;
