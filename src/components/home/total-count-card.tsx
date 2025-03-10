import { totalCountVariants } from '@/constants'
import { Area, AreaConfig } from '@ant-design/plots'
import { Card, Skeleton } from 'antd'
import React from 'react'
import { start } from 'repl'
import { Text } from '../text'

type Props = {
  resource: "companies" | "contacts" | "deals"
  isLoading: boolean,
  totalCount?: number,
}

const TotalCountCard = ({ resource, isLoading, totalCount }: Props) => {
  const { primaryColor, secondaryColor, icon, title } = totalCountVariants[resource]
  const config: AreaConfig = {
    data: totalCountVariants[resource].data,
    xField: "index",
    yField: "value",
    smooth: true,
    appendPadding: [1, 0, 0, 0],
    padding: 0,
    syncViewPadding: true,
    autoFit: true,
    tooltip: false,
    animation: false,
    xAxis: false,
    yAxis: {
      tickCount: 12,
      label: {
        style: {
          stroke: "transparent"
        }
      }, 
      grid: {
        line: {
          style: {
            stroke: "transparent"
          }
        }
      }
    },
    line: {
      color: primaryColor
    },
    areaStyle: () => {
      return {
        fill: `l(270) 0:#fff 0.2:${secondaryColor} 1:${primaryColor}`
      }
    }
  }
  return (
    <Card
      style={{height: "110px"}}
    >
        <div style={{display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap"}}>
          {icon}
          <Text size="md" className='secondary' style={{marginLeft: "8px"}}>{title}</Text>
        </div>
       <div style={{
        display: "flex",
        justifyContent: "space-between"
       }}>
        <Text size="xxxl" strong style={{
          display: "flex",
          whiteSpace: "nowrap",
          flexShrink: 0,
          textAlign: "start",
          marginLeft: "48px",


        }}>
          {isLoading? <Skeleton.Button style={{marginTop: "18px", width: "74px"}} /> : totalCount}
        </Text>
        <Area {...config} style={{width: "50%"}} />
       </div>
    </Card>
  )
}
export default TotalCountCard