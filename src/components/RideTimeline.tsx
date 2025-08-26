import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline"
import type { ITimeline } from "@/types"
import { ChevronsLeftRight } from "lucide-react"

interface TimelineProps {
  timelineData: (ITimeline | null)[];
}

export default function RideTimeline({ timelineData }: TimelineProps) {
  return (
    <Timeline defaultValue={4}>
      {timelineData?.map(item =>
        item ? <TimelineItem key={item.id} step={item.id}>
          <TimelineHeader>
            <TimelineSeparator className="" />
            <TimelineDate>{item.date}</TimelineDate>
            <TimelineTitle>{item.title}</TimelineTitle>
            <TimelineIndicator className="bg-primary/10 group-data-completed/timeline-item:bg-muted-foreground group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7">
              <ChevronsLeftRight size={14} />
            </TimelineIndicator>
          </TimelineHeader>
          <TimelineContent>{item.description}</TimelineContent>
        </TimelineItem> : null
      )
      }
    </Timeline>
  )
}
