import { Text } from '@/components/text'
import { PlusOutlined } from '@ant-design/icons'
import { useDroppable, UseDroppableArguments } from '@dnd-kit/core'
import { Badge, Button, Space } from 'antd'
import React from 'react'

type Props = {
     id: string,
     title: string,
     description?: React.ReactNode,
     count: number,
     data?: UseDroppableArguments["data"],
     onAddClick?:  (args: {id: string}) => void,
}

const KanbanColumn = ({ children, id, title, description, count, data, onAddClick }: React.PropsWithChildren<Props> ) => {

     const { isOver, setNodeRef, active } = useDroppable({
          id: id,
          data: data 
     })
     const onAddClickHandler = () => {
          onAddClick?.({ id })
     }
  return (
    <div ref={setNodeRef} style={{display: "flex", flexDirection: "column", padding:"0 16px" }}>
     <div style={{ padding: "12px" }}>
          <Space style={{width: "100%", justifyContent: "space-between"}}>
               <Space>
                    <Text size="xs" strong style={{textTransform: "uppercase", whiteSpace: "nowrap"}} ellipsis={{tooltip: title}}>
                         {title}
                    </Text>
                    {!!count && <Badge count={count} />}
               </Space>
               <Button shape="circle" icon={<PlusOutlined />} onClick={onAddClickHandler} />
          </Space>
          {description}
     </div>
     <div style={{ flex: 1, overflow: active ? "unset" : "auto", border: "2px dashed transparent", borderColor: isOver? "#000040" : "transparent", borderRadius: "4px" }}> 
          <div style={{marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px"}}>
               {children}
          </div>
     </div>
    </div>
  )
}

export default KanbanColumn