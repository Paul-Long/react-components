import React from 'react';
import {findDOMNode} from 'react-dom';
import Table from 'fast-table';
import html2canvas from 'html2canvas';

class MergeCell extends React.PureComponent {
  componentDidMount() {
    this.fCanvas();
    // document.addEventListener('keydown', this.fKeyDown);
  }

  fCanvas = async () => {
    const _this = this;
    this.canvas = await html2canvas(findDOMNode(this.table));
    const download = findDOMNode(this.download);
    const data = await this.canvas.toDataURL();
    download.setAttribute('src', this.canvas.toDataURL());
    // function dataURLtoFile(dataurl, filename) {//将base64转换为文件
    //   var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    //     bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    //   while(n--){
    //     u8arr[n] = bstr.charCodeAt(n);
    //   }
    //   return new File([u8arr], filename, {type:mime});
    // }
    // function dataURItoBlob(dataURI) {
    //   var byteString = atob(dataURI.split(',')[1]);
    //   var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    //   var ab = new ArrayBuffer(byteString.length);
    //   var ia = new Uint8Array(ab);
    //   for (var i = 0; i < byteString.length; i++) {
    //     ia[i] = byteString.charCodeAt(i);
    //   }
    //   return new Blob([ab], {type: mimeString});
    // }
    // const file = await dataURLtoFile(data, '1.png');
    // const blob = await dataURItoBlob(data);
    // console.log(file);
    function copyImage(url){
      var img=document.createElement('img');
      img.src=url;
      document.body.appendChild(img);
      var r = document.createRange();
      r.setStartBefore(img);
      r.setEndAfter(img);
      r.selectNode(img);
      var sel = window.getSelection();
      sel.addRange(r);
      document.execCommand('Copy');
    }

    copyImage(data);
    //
    document.addEventListener("paste", function (e) {
      let cbd = e.clipboardData;
      console.log(e.clipboardData);
      console.log(cbd.files);
      for (let i = 0; i < cbd.items.length; i++) {
        let item = cbd.items[i];
        const f = item.getAsFile();
        console.log('------- ', item.kind, item.type, item, f );
        item.getAsString(str => console.log(item.kind, item.type, str))
      }
    });
    // function handler(event) {
    //   event.clipboardData.setData('image/png', file);
    //   // event.clipboardData.files = [file];
    //   document.removeEventListener('copy', handler, true);
    //   event.preventDefault();
    // }
    // document.onkeydown = function (e) {
    //   if (e.ctrlKey && e.keyCode === 67) {//ctrl+C
    //     document.addEventListener('copy', handler, true);
    //     const range = document.createRange();
    //     range.selectNode(download);
    //
    //     window.getSelection().addRange(range);
    //     document.execCommand('copy');
    //   }
    // }
  };

  componentWillUnmount() {
    // document.removeEventListener('keydown', this.fKeyDown);
  }

  fKeyDown = (event) => {
    if (event.ctrlKey && event.keyCode === 67) {
      window.getSelection().removeAllRanges();
      const download = findDOMNode(this.download);
      const range = document.createRange();
      range.selectNode(download);

      window.getSelection().addRange(range);

      document.execCommand('copy');
    }
  };

  fSaveRef = name => ele => this[ name ] = ele;

  render() {
    return (
      <div className='group-cell'>
        <div className='group-cell-content'>
          <div style={{width: '100%', display: 'flex', flexDirection: 'row'}} ref={this.fSaveRef('table')}>
            <div style={{width: 80}}>
              <Table
                columns={columns1}
                dataSource={dataSource1}
                useScrollY={false}
                showHeader={true}
                getRowHeight={() => 21}
                bordered
              />
            </div>
            <div style={{width: 'calc(100% - 80px)'}}>
              <Table
                columns={columns2}
                dataSource={dataSource2}
                rowClassName={(r, i) => `table-row-${i % 2}`}
                useScrollY={false}
                showHeader={true}
                bordered
              />
            </div>
          </div>
        </div>
        <div className='div' data-clipboard-action="copy" data-clipboard-target="img">
          <img ref={this.fSaveRef('download')} src='' style={{height: 35, position: 'absolute', top: 10, left: 10}} onClick={this.fClick} />
          <input type="file" ref={this.fSaveRef('file')} />
        </div>
      </div>
    );
  }
}

export default MergeCell;

const columns1 = [ {
  dataIndex: 'quanzhong',
  title: '券种',
  align: 'center',
  onHeaderCell: () => ({background: '#373C49', color: 'white'}),
  onCell: () => ({background: '#373C49', color: 'white'})
} ];
const columns2 = [
  {dataIndex: 'pingji', title: '评级', width: 60, onHeaderCell: () => ({background: '#373C49', color: '#A2A7B7'})},
  {dataIndex: 'jiancheng', title: '债券简称', width: 60, onHeaderCell: () => ({background: '#373C49', color: '#A2A7B7'})},
  {dataIndex: 'bianji', title: '边际', width: 60, onHeaderCell: () => ({background: '#373C49', color: '#A2A7B7'})},
  {dataIndex: 'quanchangbeishu', title: '全场倍数', width: 60, onHeaderCell: () => ({background: '#373C49', color: '#A2A7B7'})},
  {dataIndex: 'bianjibeishu', title: '边际倍数', width: 60, onHeaderCell: () => ({background: '#373C49', color: '#A2A7B7'})},
  {dataIndex: 'yuqi', title: '发行人预期', width: 60, onHeaderCell: () => ({background: '#373C49', color: '#A2A7B7'})},
  {dataIndex: 'beizhu', title: '备注', width: 60, onHeaderCell: () => ({background: '#373C49', color: '#A2A7B7'})},
  {dataIndex: 'qixian', title: '期限', width: 60, onHeaderCell: () => ({background: '#1C377E', color: 'white'})},
  {dataIndex: 'faxinge', title: '发行额(亿)', width: 60, onHeaderCell: () => ({background: '#1C377E', color: 'white'})},
  {dataIndex: 'qujian', title: '区间', width: 60, onHeaderCell: () => ({background: '#1C377E', color: 'white'})},
  {dataIndex: 'shuxing', title: '属性', width: 60, onHeaderCell: () => ({background: '#1C377E', color: 'white'})},
  {dataIndex: 'faxingqishiri', title: '发行起始日', width: 60, onHeaderCell: () => ({background: '#1C377E', color: 'white'})},
  {dataIndex: 'faxingjizhiri', title: '发行截止日', width: 60, onHeaderCell: () => ({background: '#1C377E', color: 'white'})},
  {dataIndex: 'zhucheng', title: '主承', width: 60, onHeaderCell: () => ({background: '#1C377E', color: 'white'})},
];

const dataSource1 = [
  {quanzhong: 'SCP'},
  {quanzhong: 'CP'},
  {quanzhong: 'MTN'},
];
const dataSource2 = [
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
  {
    pingji: 'AAA',
    jiancheng: '19中电投SCP005',
    bianji: '3.5%',
    quanchangbeishu: '1.9',
    bianjibeishu: 25,
    yuqi: '3.5%',
    beizhu: '小区间：3%-3.25%',
    qixian: '100D',
    faxinge: 29,
    qijian: '10-15',
    shuxing: '央企',
    faxingqishiri: '1/21',
    faxingjiezhiri: '1/23',
    zhucheng: '工行'
  },
];
