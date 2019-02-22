import React from 'react';
import Checkbox from 'frc-checkbox';
import './checkbox.less';

class CheckboxDemo extends React.PureComponent {
  state = {
    checked: true
  };
  fChange = (checked) => {
    this.setState({checked});
  };

  render() {
    const {checked} = this.state;
    return (
      <div className='app-checkbox'>
        <div style={{border: '1px solid', padding: 10, marginBottom: 10}}>
          <h2>default use</h2>
          <Checkbox style={{marginRight: 10}} checked={checked} onChange={this.fChange}>Checkbox</Checkbox>
          <Checkbox style={{marginRight: 10}} disabled>Disabled</Checkbox>
          <Checkbox style={{marginRight: 10}} disabled checked>Disabled Checked</Checkbox>
        </div>
        <div style={{border: '1px solid', padding: 10, marginBottom: 10}}>
          <h2>checkbox size use</h2>
          <Checkbox style={{marginRight: 10}} checked={true}>Default Checkbox</Checkbox>
          <Checkbox style={{marginRight: 10}} checked={true} size='small'>Small Checkbox</Checkbox>
          <Checkbox style={{marginRight: 10}} checked={true} size='large'>Large Checkbox</Checkbox>
        </div>
        <div style={{border: '1px solid', padding: 10, marginBottom: 10}}>
          <h2>checkbox indeterminate use</h2>
          <Checkbox style={{marginRight: 10}} indeterminate>Indeterminate Checkbox Square</Checkbox>
          <Checkbox style={{marginRight: 10}} indeterminate indeterminateType='line'>Indeterminate Checkbox Line</Checkbox>
          <Checkbox style={{marginRight: 10}} indeterminate size='small'>Indeterminate Small Checkbox</Checkbox>
          <Checkbox style={{marginRight: 10}} indeterminate indeterminateType='line' size='small'>Indeterminate Small Checkbox </Checkbox>
          <Checkbox style={{marginRight: 10}} indeterminate size='large'>Indeterminate Large Checkbox Square</Checkbox>
          <Checkbox style={{marginRight: 10}} indeterminate indeterminateType='line' size='large'>Indeterminate Large Checkbox Line</Checkbox>
        </div>
      </div>
    )
  }
}

export default CheckboxDemo;
