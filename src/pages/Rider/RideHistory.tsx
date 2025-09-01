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
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import type { IRide } from "@/types";
import { format } from "date-fns";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, LoaderCircleIcon, Search } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { rideStatus } from "@/constents/rideStatus";
import { useGetMyRidesQuery } from "@/redux/features/rider/rider.api";
import { useId } from "react"
import { Input } from "@/components/ui/input"
import { Link } from "react-router";

const RideHistory = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [filters, setFilters] = useState<{
        status?: string
        createdAt?: Date,
        fareEstimation?: number,
    }>({})
    const [open, setOpen] = useState(false)
    const { data, isLoading } = useGetMyRidesQuery({ page: currentPage, limit: 10, ...filters })
    const totalPage = data?.data?.meta?.totalPage || 1;


    console.log(filters)
    console.log(data?.data)


    const id = useId()
    const allRideStatus = [rideStatus.requested, rideStatus.accepted, rideStatus.rejected, rideStatus.picked_up, rideStatus.in_transit, rideStatus.completed, rideStatus.cancelled]

    const handleFilterChange = (key: string, value: string | Date | number | undefined) => {
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

    console.log(data?.data?.data.length)



    return (
        <div>
            {data?.data?.data.length === 0 ? <p className="text-center mt-20 text-muted-foreground">No ride history found</p>
                : <div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-5">
                        <div className="*:not-first:mt-2 w-48">
                            <Label htmlFor={id}>Search Rides</Label>
                            <div className="relative">
                                <Input id={id} className="peer pe-9"
                                    onChange={(e) => {
                                        handleFilterChange("searchTerm", e.target.value);
                                    }}
                                    placeholder="Search" />
                                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                                    <Search size={16} aria-hidden="true" />
                                </div>
                            </div>
                        </div>
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
                        <div className="*:not-first:mt-2 w-48">
                            <Label htmlFor={id}>Find by fare range</Label>
                            <div className="relative">
                                <Input id={id} className="peer pe-9"
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        handleFilterChange("fareEstimation", value === 0 ? undefined : value);
                                    }}
                                    type="number"
                                    placeholder="Search" />
                                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                                    <Search size={16} aria-hidden="true" />
                                </div>
                            </div>
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

                    <Table className="mt-8">
                        <TableHeader>
                            <TableRow className="hover:bg-transparent text-nowrap">
                                <TableHead>Pickup Location</TableHead>
                                <TableHead>Destination Location</TableHead>
                                <TableHead>Payment Method</TableHead>
                                <TableHead>Fare range</TableHead>
                                <TableHead>Ride Status</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.data?.data?.map((item: IRide) => (
                                <TableRow key={item._id} className="text-nowrap">
                                    <TableCell>{item.pickupLocation}</TableCell>
                                    <TableCell>{item.destinationLocation}</TableCell>
                                    <TableCell>{item.paymentMethod}</TableCell>
                                    <TableCell >{item.fareEstimation}TK</TableCell>
                                    <TableCell >{item.status}</TableCell>
                                    <TableCell > {format(new Date(item.createdAt), "PP")}</TableCell>
                                    <TableCell ><Link to={`/rider/ride-details/${item._id}`}><Button size="sm">Details</Button></Link></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {totalPage > 1 &&
                        <div className="flex justify-center mt-4">
                            <div>
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => setCurrentPage((prev) => prev - 1)}
                                                className={currentPage === 1
                                                    ? "pointer-events-none opacity-50"
                                                    : "cursor-pointer"} />
                                        </PaginationItem>

                                        {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                                            (page) => (
                                                <PaginationItem
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}>
                                                    <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                                                </PaginationItem>
                                            )
                                        )}
                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                                className={currentPage === totalPage
                                                    ? "pointer-events-none opacity-50"
                                                    : "cursor-pointer"} />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>}
                </div>}

        </div>
    );
};

export default RideHistory;