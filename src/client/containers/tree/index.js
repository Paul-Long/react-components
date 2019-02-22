import React from 'react';
import Tree from 'frc-tree';
import './tree.less';

class TreeDemo extends React.PureComponent {
  render() {
    return (
      <div className='app-tree'>
        <div className='app-tree-card'>
          <h3>Checkable true</h3>
          <div className='app-tree-content'>
            <Tree nodes={treeData} checkable
                  onCheck={(keys) => console.log('onCheck -> ', keys)}
                  onSelect={(keys) => console.log('onSelect -> ', keys)}
                  onExpand={(keys) => console.log('onExpand -> ', keys)}
            />
          </div>
        </div>
        <div className='app-tree-card'>
          <h3>Checkable false</h3>
          <div className='app-tree-content'>
            <Tree nodes={treeData} checkable={false} />
          </div>
        </div>
        <div className='app-tree-card'>
          <h3>default</h3>
          <div className='app-tree-content'>
            <Tree
              nodes={[
              {key: '1', title: 'parent 1', children: [
                  {title: 'parent 1-0', key: '0-0-0', disabled: true, children: [
                      {key: '0-0-0-0', title: 'leaf', disableCheckbox: true},
                      {key: '0-0-0-1', title: 'leaf'}
                    ]
                  },
                  {title: 'parent 1-1', key: '0-0-1', children: [
                      {key: '0-0-1-0', title: 'leaf'},
                      {key: '0-0-1-1', title: 'leaf'}
                    ]
                  }
                ]
              }]}
              checkable={true}
              expandedKeys={['1', '0-0-0', '0-0-1']}
              defaultCheckedKeys={['0-0-0', '0-0-1']}
            />
          </div>
        </div>
        <div className='app-tree-card'>
          <h3>select multiple</h3>
          <div className='app-tree-content'>
            <Tree nodes={[{key: '1', title: '1'}, {key: '2', title: '2', children: [{key: '2-1', title: '2-1'}]}]} checkable={false} multiple />
          </div>
        </div>
      </div>
    )
  }
}

const treeData = [];

for (let i = 0; i < 500; i++) {
  let item = {key: `${i}`, title: `${i}--------------------------------------${i}`, children: []};
  for (let j = 0; j < 10; j++) {
    let item1 = {key: `${i}-${j}`, title: `${i}-${j}`, children: []};
    for (let k = 0; k < 10; k++) {
      let item2 = {key: `${i}-${j}-${k}`, title: `${i}-${j}-${k}`};
      item1.children.push(item2);
    }
    item.children.push(item1);
  }
  treeData.push(item);
}

export default TreeDemo;
