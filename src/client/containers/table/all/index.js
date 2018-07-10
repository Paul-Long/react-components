import React from 'react';
import Table from 'fast-table';

const columns = [
  {
    title: '第一列',
    align: 'left',
    dataIndex: 'key',
    sortEnable: true,
    order: true,
    fixed: 'left',
    width: 100,
    render: (text) => (<span>{text}</span>),
    onCell: () => ({color: '#F9C152'})
  },
  {
    title: '第二列',
    width: 100,
    sortEnable: true,
    onCell: () => ({background: '#1E1F17', color: '#FF9200'}),
    children: [
      {
        title: '二-01', children: [
          {title: '二-001', align: 'left', dataIndex: 'key0', width: '5%'},
          {title: '二-002', align: 'right', dataIndex: 'key1', width: '5%'}
        ]
      },
      {
        title: '二-02', children: [
          {title: '二-003', align: 'left', dataIndex: 'key3', width: '5%'},
          {title: '二-004', align: 'right', dataIndex: 'key4', width: '5%'}
        ]
      }
    ]
  },
  {
    title: '第三列',
    width: 100,
    onCell: (column, record, index) => {
      if (index % 2 === 0) {
        return {background: '#122024', color: '#11A1FF'};
      }
      return {color: '#11A1FF'};
    },
    children: [
      {
        title: '第三列-01', align: 'left', dataIndex: 'key5', width: 120
      },
      {
        title: '第三列-02', align: 'right', dataIndex: 'key6', width: 120
      }
    ]
  },
  {
    title: '第四列',
    align: 'left',
    dataIndex: 'key7',
    width: 130,
    onCell: (column, record, index) => {
      if (index % 2 === 0) {
        return {background: '#121A18', color: '#F9C152'};
      }
      return {color: '#F9C152'};
    }
  },
  {
    title: '第五列',
    align: 'left',
    dataIndex: 'key8',
    width: 120,
    onCell: (column, record, index) => {
      return {color: '#7B8280'};
    }
  },
  {
    title: '第六列',
    align: 'left',
    dataIndex: 'key9',
    width: 100,
  },
  {
    title: '第七列',
    align: 'left',
    dataIndex: 'key10',
    width: 100,
  },
  {
    title: '第八列',
    align: 'left',
    dataIndex: 'key11',
    width: 100,
  },
  {
    title: '第九列',
    align: 'left',
    dataIndex: 'key12',
    width: 100,
  },
  {
    title: '第十列',
    align: 'left',
    dataIndex: 'key13',
    width: 200,
  },
  {
    title: '第十一列',
    align: 'left',
    dataIndex: 'key14',
    width: 200,
  },{
    title: '第十二列',
    align: 'left',
    dataIndex: 'key15',
    width: 200,
  },{
    title: '第十三列',
    align: 'left',
    dataIndex: 'key16',
    width: 200,
  },{
    title: '第十四列',
    align: 'left',
    dataIndex: 'key17',
    width: 200,
  },{
    title: '第十五列',
    align: 'left',
    dataIndex: 'key18',
    width: 200,
  },{
    title: '第十六列',
    align: 'left',
    fixed: 'right',
    dataIndex: 'key19',
    width: 200,
  }
];

function update() {
  const data = [];

  for (let i = 0; i < 1000; i++) {
    const row = {key: `${i}`};
    for (let j = 0; j < 20; j++) {
      row[`key${j}`] = `R${i}-C${j}`;
    }
    const children = [];
    for (let c = 0; c < 5; c++) {
      const r = {key: `${i}-${c}`};
      for (let j = 0; j < 14; j++) {
        r[`key${j}`] = `R${i}-${c}-C${j}`;
      }
      children.push(r);
    }
    row.children = children;
    data.push(row);
  }
  return data;
}

class TableAll extends React.Component {
  constructor(props) {
    super(props);
    this.timer = 0;
  }

  state = {
    data: update()
  };

  componentWillMount() {
    this.timer = (new Date()).getTime();
  }

  componentDidMount() {
    let n = (new Date()).getTime();
    console.log('render time -> ', n - this.timer);
  }

  render() {
    return (
        <Table
          columns={columns}
          dataSource={this.state.data}
          fixedHeader
          showHeader
          bordered
          footer={() => '加载更多'}
          sortMulti={false}
          expandedRowKeys={['0', '2']}
          onSort={(column, order) => {
            const data = this.state.data;
            this.setState({data: [...data].reverse()});
          }}
          onScrollEnd={() => {
            console.log('onScrollEnd refresh');
          }}
        />
    );
  }
}

export default TableAll;
