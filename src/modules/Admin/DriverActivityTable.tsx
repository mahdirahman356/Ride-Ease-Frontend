import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Bike } from "lucide-react"
import type { IDriverActivity } from "@/types"

interface DriverActivityProps {
    driverActivity: IDriverActivity[]
}

export default function DriverActivityTable({driverActivity}: DriverActivityProps) {
    return (
        <div className="p-4 my-5">
            <div className="flex items-center gap-3">
                <div className="flex justify-center items-center rounded-full border w-10 h-10" >
                    <Bike />
                </div>
                <div>
                    <p className="text-xl font-bold">Driver Activity</p>
                </div>
            </div>      <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent text-nowrap">
                        <TableHead>Driver</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rides</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Earnings</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {driverActivity?.map((item) => (
                        <TableRow key={item._id} className="text-nowrap">
                            <TableCell>
                                    <div>
                                        <div className="font-medium">{item.name}</div>
                                        <span className="text-muted-foreground mt-0.5 text-xs">
                                            {item?.address ? item?.address : "Address not provided"}
                                        </span>
                                    </div>
                            </TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.totalRides}</TableCell>
                            <TableCell>{item.isActive === "ACTIVE" ? "Active" : "Block"}</TableCell>
                            <TableCell>{item.totalRevenue}TK</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
