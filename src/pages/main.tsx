/* eslint-disable react/react-in-jsx-scope */

import React,{ useState, useEffect } from 'react';
const   styles =require ('./main.module.less');
interface Props {
  aa: string;
  bb: string;
}

function Example(props:Props) {
  const [count,setCount] = useState(1);
  useEffect(()=>{
    fetch('/api/xiaoyi/goodsList').then(res=>res.json()).then(data=>{
      console.log(data,'data')
    })
  })
  console.log(styles,'styles')
  return (
    <>
    <div className={styles.container}>you clicked {count} times</div>
    <button onClick={()=>setCount(count+1)}>add</button>
    <button onClick={()=>setCount(count-1)}>reduce</button>

  </>
  );
}

function A(){
  let aa = "ads"
  return <Example aa={aa} bb='ss'/>
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