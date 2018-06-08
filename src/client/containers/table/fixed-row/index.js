import React from 'react';
import Table from 'fast-table';

class FixedRowTable extends React.Component {
  rowClassName = (record, index) => {
    return `fixed-row-${index}`;
  };

  render() {
    return (
      <Table
        className={`fixed-row-table`}
        columns={columns}
        dataSource={data}
        rowClassName={this.rowClassName}
        hoverEnable={false}
        fixedHeader
        showHeader
        bordered
      />
    );
  }
}

export default FixedRowTable;
const columns = [
  {
    title: '第一列',
    align: 'left',
    dataIndex: 'key',
    width: 100
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
    width: 120
  },
  {
    title: '第六列',
    align: 'left',
    dataIndex: 'key4',
    width: 100,
  }
];
const data = [];

for (let i = 0; i < 100; i++) {
  const row = { key: `${i}` };
  for (let j = 0; j < 6; j++) {
    row[`key${j}`] = Math.random().toString(36).substr(2);
  }
  if (i < 2) {
    row.isFixed = true;
  }
  data.push(row);
}
