import React from 'react';
import {Button} from 'antd';

class TriggerDemo extends React.Component {
  componentDidMount() {
  }
  fClick = () => {
    const arr = [];

    for (let i = 0; i < 10000; i++) {
      arr.push(Math.round(Math.random() * 100));
    }

    const mid = function() {
      let len = arr.length;
      if (len % 2 === 0) {
        return (len / 2) - 1;
      } else {
        return (len - 1) / 2;
      }
    };


    // current
    let currentIndex;
    let currentCount;

    // before
    let beforeIndex;
    let beforeCount;

    // next
    let nextIndex;
    let nextCount;

    // next-next
    let nextNextIndex;
    let nextNextCount;

    let index;

    let max, min;


    for (let i = 0; i < arr.length; i++) {
      let count = 0;
      currentIndex = i;
      currentCount = 0;
      beforeIndex = undefined;
      beforeCount = 0;
      nextIndex = undefined;
      nextCount = 0;
      for (let j = 0; j < arr.length; j++) {
        if (arr[i] > arr[j]) {
          count += 1;
          if (beforeIndex === undefined || arr[beforeIndex] < arr[j]) {
            beforeIndex = j;
            beforeCount = 0;
          }
        }
        if (arr[i] < arr[j]) {
          if (nextIndex === undefined || arr[nextIndex] > arr[j]) {
            nextIndex = j;
            nextCount = 0;
            if (nextNextIndex === undefined || arr[nextNextIndex] > arr[j]) {

            }
          }
          if (nextIndex !== j) {
            if (nextNextIndex === undefined || arr[nextNextIndex] > arr[j]) {
              nextNextIndex = j;
            }
          }
        }
        if (arr[i] === arr[j]) {
          currentCount += 1;
        }
        if (beforeIndex !== undefined && arr[beforeIndex] === arr[j]) {
          beforeCount += 1;
        }
        if (nextIndex !== undefined && arr[nextIndex] === arr[j]) {
          nextCount += 1;
        }
      }
      const midIndex = mid();
      if (index === undefined) {
        if (midIndex >= count && midIndex < count + currentCount) {
          index = currentIndex;
        } else if (midIndex >= count - beforeCount && midIndex < count) {
          index = beforeIndex;
        } else if (midIndex > count + currentCount && midIndex <= count + nextCount) {
          index = nextIndex;
        }
        if (index !== undefined) {
          console.log('----------------------------------------------------------------');
          console.log('midIndex  -> ', midIndex, index, count, arr[index]);
          console.log('before    -> ', arr[beforeIndex], beforeIndex, beforeCount);
          console.log('current   -> ', arr[currentIndex], currentIndex, currentCount);
          console.log('next      -> ', arr[nextIndex], nextIndex, nextCount);
          console.log('next-next -> ', arr[nextNextIndex], nextNextIndex);
          break;
        }
      }
    }
    function sequence(a,b){
      if (a>b) {
        return 1;
      }else if(a<b){
        return -1
      }else{
        return 0;
      }
    }
    const arrBak = [...arr];
    const a = arrBak.sort(sequence);
    const i = mid();
    if (arr[index] !== a[i]) {
      console.error('error  -> ', arr[index], a[i]);
    } else {
      console.log('-----------------------------------------------------------------');
      console.log(`-- middle = [${arr[index]} - ${a[i]}]`);
    }
  };
  render() {
    return (
      <Button onClick={this.fClick}>CALC</Button>
    )
  }
}

export default TriggerDemo;
