/* eslint-disable react/react-in-jsx-scope */

import React,{ useState } from 'react';
import  styles from './main.module.less';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

function Example({ name, enthusiasmLevel = 1 }: Props) {
  const [count,setCount] = useState(1);
  return (
    <>
    <div className={styles.container}>you clicked {count} times</div>
    <button onClick={()=>setCount(count+1)}>{name}</button>
    <button onClick={()=>setCount(count-1)}>{enthusiasmLevel}</button>

  </>
  );
}

export default Example;