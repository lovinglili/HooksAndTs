/* eslint-disable react/react-in-jsx-scope */

import React, { useState, useEffect } from 'react';
// import OverviewChart from './Chart';
const styles = require('./main.module.less');
interface Props {
  aa: string;
  bb: string;
}

function Example(props: Props) {
  const [count, setCount] = useState(1);
  useEffect(() => {
    fetch('/api/xiaoyi/goodsList').then(res => res.json()).then(data => {
      console.log(data, 'data')
    })
  })
  console.log(styles, 'styles')
  const data = {
    success : true,
    data : {
      totalCnt : 10,
      items : [{
        name :' sigma-1',           // 集群名
        totalAppCount : 100,        // 总应用服务数
        meshedAppCount : 30,        // 已启用Mesh应用服务数
        sidecarDetails : {
          mosn : {
            'v1.0.0' : 10,
            'v1.1.0' : 1,
            none : 5
          },
          odp : {
            'v1.0.0' : 1,
            none : 10
          },
          mist : {
            'v1.0.0' : 1,
            none : 9
          }
        }
      },{
        name :' sigma-2',           // 集群名
        totalAppCount : 100,        // 总应用服务数
        meshedAppCount : 30,        // 已启用Mesh应用服务数
        sidecarDetails : {
          mosn : {
            'v1.0.0' : 10,
            'v1.1.0' : 1,
            none : 5
          },
          odp : {
            'v1.0.0' : 1,
            none : 10
          },
          mist : {
            'v1.0.0' : 1,
            none : 9
          }
        }
      }]
    }
  };

  const { items } = data.data;
  const currentType= "mist";
  // 数据请求成功后left的数据, 提取出函数
  let currentValue = {};
  let leftValue:any = [];
  items.forEach(item => {
    const { name, totalAppCount, meshedAppCount, sidecarDetails } = item;
    currentValue={ name,'已开启 mesh 数': totalAppCount-meshedAppCount, '未开启 mesh 数':meshedAppCount};
    leftValue.push(currentValue);
    currentValue={};
  });
  console.log(leftValue,'left')

const rightValue:any = [];
let versionList:string[]=[];
  // right 的表格数据。currentType 改变的时候，用useMemo函数。
  items.forEach(item => {
    const { name, totalAppCount, meshedAppCount, sidecarDetails } = item;
    if(sidecarDetails[currentType]){ 
      const version = Object.keys(sidecarDetails[currentType]);
      console.log(version,'version')
      versionList = versionList.concat(version);
      currentValue={ name,...sidecarDetails[currentType]};
      rightValue.push(currentValue);
      currentValue={};
    };
    // versionLList 单独穿给图标，根据currentType传递颜色
    versionList =  versionList.filter((item,index,arr)=>arr.indexOf(item)===index);
   console.log(rightValue,versionList,'rightValue')
  });


  return (
    <>
      <div className={styles.container}>you clicked {count} times</div>
      <button onClick={() => setCount(count + 1)}>add</button>
      <button onClick={() => setCount(count - 1)}>reduce</button>
      <div style={{ marginTop: 20 }}>
        {/* <OverviewChart /> */}
      </div>
    </>
  );
}

function A() {
  let aa = "ads"
  return <Example aa={aa} bb='ss' />
}

export default A;

// class Example extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 0
//     };
//   }

//   componentDidMount(){
//     fetch('/api/xiaoyi/goodsList').then(res=>res.json()).then(data=>{
//       console.log(data,'data')
//     })
//   }
//   getstatus(){

//   }

//   getStatus(){

//   }

// // TODO:
// // FIXME:
//   render() {
//     return (
//       <>
//         <div>You clicked {this.state.count} times</div>
//         <button onClick={() => this.setState({ count: this.state.count + 1 })}>add</button>
//         <button onClick={() => this.setState({ count: this.state.count - 1 })}>reduce</button>
//       </>
//     );
//   }
// }
// export default Example