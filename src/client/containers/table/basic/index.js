import React from 'react';
import Table from 'fast-table';

class BasicTable extends React.Component {
  state = {
    headerSortable: false
  };
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
  }
  onKeyDown = (event) => {
    if (event.keyCode === 17) {
      this.setState({headerSortable: true});
    }
  };

  onKeyUp = (event) => {
    if (event.keyCode === 17) {
      this.setState({headerSortable: false});
    }
  };

  render() {
    const {headerSortable} = this.state;
    return (
      <Table
        columns={columns}
        dataSource={data}
        fixedHeader={true}
        headerSortable={headerSortable}
        colMinWidth={80}
        showHeader
        bordered
      />
    )
  }
}

export default BasicTable;
const columns = [
  {
    title: '第一列',
    align: 'left',
    dataIndex: 'key',
    fixed: 'left',
    width: 100,
  },
  {
    title: '第二列',
    dataIndex: 'key0',
    width: 100,
    sortEnable: true
  },
  {
    title: '第三列',
    dataIndex: 'key1',
    width: 100
  },
  {
    title: '第四列',
    align: 'left',
    dataIndex: 'key2',
    width: 130
  },
  {
    title: '第五列',
    align: 'left',
    dataIndex: 'key3',
    width: 120,
  },
  {
    title: '第六列',
    align: 'left',
    dataIndex: 'key4',
    width: 100,
    fixed: 'right'
  }
];
const data = [];

for (let i = 0; i < 500; i++) {
  const row = {key: `${i}`};
  for (let j = 0; j < 6; j++) {
    row[`key${j}`] = Math.random().toString(36).substr(2);
  }
  data.push(row);
}
