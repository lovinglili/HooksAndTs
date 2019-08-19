import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";

class Stackedcolumn extends React.Component {
  render() {
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
            'v1.1.1' : 1,
            none : 5
          },
          odp : {
            'v1.0.0' : 1,
            none : 10
          },
          mist : {
            'v1.0.1' : 1,
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
const color=['#E6F6C8-#3376CB']
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
    versionList =  versionList.filter((item,index,arr)=>arr.indexOf(item)===index).sort();
   console.log(rightValue,versionList,'rightValue')
    versionList.shift();
    versionList.push('none')
  });
    const ds = new DataSet();
    const dv = ds.createView().source(rightValue);
    dv.transform({
      type: "fold",
      fields: versionList,
      // 展开字段集
      key: "是否开启名称",
      // key字段
      value: "数量",
      // value字段
      retains: ["name"] // 保留字段集，默认为除fields以外的所有字段
    });
    return (
      <div>
        <Chart height={400} data={dv} forceFit>
          <Legend />
         
          <Axis
            name="name"
          />
          <Axis name="数量" />
          <Tooltip inPlot={false} crosshairs={false} />
          <Geom
            type="intervalStack"
            position="name*数量"
            color={['是否开启名称', '#0000ff-#bbbbbb']}
          />
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<Stackedcolumn />, mountNode)
