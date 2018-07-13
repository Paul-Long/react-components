import React from 'react';
import Table from 'fast-table';

class RowEvent extends React.PureComponent {
  handleMouseEnter = (record) => {
    console.log(`[${record.key}] -> Row onMouseEnter`);
  };
  handleMouseLeave = (record) => {
    console.log(`[${record.key}] -> Row onMouseLeave`);
  };
  handleClick = (record) => {
    console.log(`[${record.key}] -> Row onClick`);
  };
  handleDoubleClick = (record) => {
    console.log(`[${record.key}] -> Row onDoubleClick`);
  };
  handleRow = (record) => {
    return {
      onClick: () => this.handleClick(record),
      onMouseEnter: () => this.handleMouseEnter(record),
      onMouseLeave: () => this.handleMouseLeave(record),
      onDoubleClick: () => this.handleDoubleClick(record),
    }
  };
  render() {
    return (
      <Table
        className={'row-event'}
        columns={columns}
        dataSource={data}
        hoverEnable={false}
        fixedHeader
        showHeader
        bordered
        onRow={this.handleRow}
      />
    );
  }
}

export default RowEvent;
const columns = [
  {
    title: '序号',
    align: 'left',
    dataIndex: 'key',
    width: 100
  },
  {
    title: '销量',
    dataIndex: 'key0',
    width: 100,
    sortEnable: true
  },
  {
    title: '访问量',
    dataIndex: 'key1',
    width: 100
  },
  {
    title: '投放量',
    align: 'left',
    dataIndex: 'key2',
    width: 130
  },
  {
    title: '总量',
    align: 'left',
    dataIndex: 'key3',
    width: 120
  },
  {
    title: '时间',
    align: 'left',
    dataIndex: 'key4',
    width: 100,
  }
];

const data = [];
let lastRow = {
  ['key0']: 0,
  ['key1']: 0,
  ['key2']: 0,
  ['key3']: 0,
};
for (let i = 0; i < 100; i++) {
  const row = {key: `${i}`};
  let total = 0;
  for (let j = 0; j < 5; j++) {
    if (j < 3) {
      const random = Math.random() * 1000;
      row[`key${j}`] = parseInt(random, 10);
      total += row[`key${j}`];
      lastRow[`key${j}`] += row[`key${j}`];
    } else if (j === 3) {
      row[`key${j}`] = total;
      lastRow[`key${j}`] += row[`key${j}`];
    } else {
      const now = new Date();
      row[`key${j}`] = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    }
  }
  if (i > 98) {
    row.isFixed = 'bottom';
    row[`key${0}`] = '合计：';
    row[`key${1}`] = lastRow[`key${1}`];
    row[`key${2}`] = '总计：';
    row[`key${3}`] = lastRow[`key${3}`];
    row[`key${4}`] = '';
  }
  data.push(row);
}

