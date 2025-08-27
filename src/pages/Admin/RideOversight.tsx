import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetAllRidesQuery, useGetAllUsersQuery } from "@/redux/features/admin/admin.api";
import type { IRide, IUser } from "@/types";
import { format } from "date-fns";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon, LoaderCircleIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { rideStatus } from "@/constents/rideStatus";


const RideOversight = () => {

    const [filters, setFilters] = useState<{
        status?: string
        createdAt?: Date
    }>({})
    const [open, setOpen] = useState(false)

    const { data, isLoading } = useGetAllRidesQuery(filters)
    const { data: riders } = useGetAllUsersQuery({ role: "RIDER", fields: "_id,name" })
    const { data: drivers } = useGetAllUsersQuery({ role: "DRIVER", fields: "_id,name" })
    console.log(riders?.data)
    console.log(filters)

    const allRideStatus = [rideStatus.requested, rideStatus.accepted, rideStatus.rejected, rideStatus.picked_up, rideStatus.in_transit, rideStatus.completed, rideStatus.cancelled]


    const handleFilterChange = (key: string, value: string | Date | undefined) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

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
        {data?.data.length === 0 ?  <p className="text-center mt-20 text-muted-foreground">No ride yet</p>   
        : <div className="p-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-5">
                <div>
                    <Label className="mb-2">Find by status</Label>
                    <Select
                        onValueChange={(value) => handleFilterChange("status", value)}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Find by status</SelectLabel>
                                {allRideStatus.map((item) => (
                                    <SelectItem key={item} value={item}>{item}</SelectItem>
                                ))}

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className="mb-2">Find by Rider</Label>
                    <Select
                        onValueChange={(value) => handleFilterChange("rider", value)}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Select rider" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Find by Rider</SelectLabel>
                                {riders?.data?.map((item: IUser) => (
                                    <SelectItem key={item._id} value={item._id as string}>{item.name}</SelectItem>
                                ))}

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className="mb-2">Find by driver</Label>
                    <Select
                        onValueChange={(value) => handleFilterChange("driver", value)}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Select driver" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Find by driver</SelectLabel>
                                {drivers?.data?.map((item: IUser) => (
                                    <SelectItem key={item._id} value={item._id as string}>{item.name}</SelectItem>
                                ))}

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-3">
                    <Label htmlFor="date" className="px-1">
                        find by date
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <div
                                id="date"
                                className="w-48 cursor-pointer rounded-sm border text-muted-foreground px-3 py-2 flex items-center justify-between"
                            >
                                {filters.createdAt
                                    ? format(filters.createdAt, "PPP")
                                    : "Pick a date"}
                                <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={filters.createdAt}
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                    if (date) {
                                        handleFilterChange("createdAt", format(date, "yyyy-MM-dd"))
                                    }
                                }} />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <Table className="my-5">
                <TableHeader>
                    <TableRow className="hover:bg-transparent text-nowrap">
                        <TableHead>Pickup Location</TableHead>
                        <TableHead>Destination Location</TableHead>
                        <TableHead>Rider</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead>Fare range</TableHead>
                        <TableHead>Ride Status</TableHead>
                        <TableHead>Date & Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data?.map((item: IRide) => (
                        <TableRow key={item._id} className="text-nowrap">
                            <TableCell>{item.pickupLocation}</TableCell>
                            <TableCell>{item.destinationLocation}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <div>
                                        <div className="font-medium">{item.rider?.name}</div>
                                        <span className="text-muted-foreground mt-0.5 text-xs">
                                            {item.rider?.role}
                                        </span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <div>
                                        {item.driver?.name ? (
                                            <div>
                                                <div className="font-medium">{item.driver?.name}</div>
                                                <span className="text-muted-foreground mt-0.5 text-xs">
                                                    {item.driver?.role}
                                                </span>
                                            </div>
                                        ) : <p>Pending</p>}

                                    </div>
                                </div>
                            </TableCell>
                            <TableCell >{item.fareEstimation}TK</TableCell>
                            <TableCell >{item.status}</TableCell>
                            <TableCell > {format(new Date(item.createdAt), "PP")}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>}
         
       </div>
    );
};

export default RideOversight;