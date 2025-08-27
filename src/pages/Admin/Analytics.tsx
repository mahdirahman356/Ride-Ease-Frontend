import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

import { useAdminAnalyticsQuery } from "@/redux/features/admin/admin.api"
import DriverActivityTable from "@/modules/Admin/DriverActivityTable"
import { LoaderCircleIcon } from "lucide-react"

export const description = "An interactive area chart"


const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    revenue: {
        label: "Revenue",
        color: "var(--chart-1)",
    },
    rides: {
        label: "Rides",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function Analytics() {

    const { data, isLoading } = useAdminAnalyticsQuery(undefined)
    console.log(data?.data?.driverActivity)

    const filteredData = data?.data?.analyticsData.filter((item: { date: string | number | Date }) => {
        const date = new Date(item.date)

        return date
    })

    if (isLoading) {
        return <div className="flex justify-center items-center my-20">
            <LoaderCircleIcon
                className="-ms-1 animate-spin"
                size={30}
                aria-hidden="true"
            />
        </div>
    }

    return (
        <div>
            {data?.data?.analyticsData.length === 0 && data?.data?.driverActivity.length === 0 ? <p className="text-center mt-20 text-muted-foreground">No ride yet</p>  
            :  <div>
                 <Card className="pt-0 shadow-none border-0">
                <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                    <div className="grid flex-1 gap-1">
                        <CardTitle>Area Chart - Interactive</CardTitle>
                        <CardDescription>
                            Showing total visitors for the last 3 months
                        </CardDescription>
                    </div>

                </CardHeader>
                <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[250px] w-full"
                    >
                        <AreaChart data={filteredData}>
                            <defs>
                                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-revenue)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-revenue)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-rides)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-rides)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    const date = new Date(value)
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })
                                }}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(value) => {
                                            return new Date(value).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                            })
                                        }}
                                        indicator="dot"
                                    />
                                }
                            />
                            <Area
                                dataKey="rides"
                                type="natural"
                                fill="url(#fillMobile)"
                                stroke="var(--color-rides)"
                                stackId="a"
                            />
                            <Area
                                dataKey="revenue"
                                type="natural"
                                fill="url(#fillDesktop)"
                                stroke="var(--color-revenue)"
                                stackId="a"
                            />
                            <ChartLegend content={<ChartLegendContent payload={undefined} />} />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <DriverActivityTable driverActivity={data?.data?.driverActivity} />
            </div>}
        </div>
    )
}
