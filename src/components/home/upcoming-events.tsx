import { DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY } from '@/graphql/queries'
import { getDate } from '@/utilities/helpers'
import { CalendarOutlined } from '@ant-design/icons'
import { useList } from '@refinedev/core'
import { Badge, Card, List } from 'antd'
import dayjs from 'dayjs'
import UpcomingEventsSkeleton from '../skeleton/upcoming-events'
import { Text } from '../text'

const UpcomingEvents = () => {
     const { data, isLoading } = useList({
          resource: "events",
          pagination: {pageSize: 5},
          sorters: [
               {
                    field: "startDate",
                    order: "asc"
               }
          ],
          filters: [
               {
                    field: "startDate",
                    operator: "gte",
                    value: dayjs().format("YYYY-MM-DD")
               }
          ],
          meta: {
               gqlQuery: DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY
          }
     })

  return (
    <Card 
          style={{height: "100%"}} 
          title={
               <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
               }}>
                    <CalendarOutlined />
                    <Text size="sm" style={{marginLeft: "0.7rem" }}>Upcoming Events</Text>
               </div>
          }
     >
          {isLoading ? (
               <List
                    itemLayout='horizontal'
                    dataSource={Array.from({length: 5}).map((_, index) => ({
                         id: index,
                    }))}
                    renderItem={() => (<UpcomingEventsSkeleton/>)}
               />
          ) : (
               <List
                    itemLayout='horizontal'
                    dataSource={data?.data || []}
                    renderItem={(item) => {
                         const renderDate = getDate(item.startDate, item.endDate)
                         return (
                         <List.Item>
                              <List.Item.Meta
                                   avatar={<Badge color={item.color} />}
                                   title={<Text size="xs">{renderDate}</Text>}
                                   description={<Text ellipsis={{tooltip: true}} strong>{item.title}</Text>}
                              />
                         </List.Item>
                    )}}
               />
          )}
          {!isLoading && data?.data.length === 0 && (
               <span
                    style={{
                         display: "flex",
                         justifyContent: "center",
                         alignItems: "center",
                         height: "120px"
                    }}
               >No Upcoming Events</span>
          ) }
    </Card>
  )
}

export default UpcomingEvents