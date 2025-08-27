import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetAllUsersQuery, useUpdateActivityStatusMutation, useUpdateDriverApprovalMutation } from "@/redux/features/admin/admin.api"
import type { IUser, TRole } from "@/types"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { LoaderCircleIcon, Search } from "lucide-react"

export default function ManageUsers() {

    const form = useForm()

    const [filter, setFilter] = useState("ALL")
    const [searchTerm, setSearchTerm] = useState("")

    const queryParam: Record<string, string> = {}
    if (filter !== "ALL") queryParam.role = filter
    if (searchTerm) queryParam.searchTerm = searchTerm

    const { data, isLoading } = useGetAllUsersQuery(queryParam)
    const [updateActivityStatus] = useUpdateActivityStatusMutation()
    const [updateDriverApproval] = useUpdateDriverApprovalMutation()


    const handleFilterByRole = (value: string) => {
        console.log(value)
        setFilter(value)
    }

    const onSubmit: SubmitHandler<FieldValues> = (value) => {
        console.log(value)
        setSearchTerm(value.search)
    }

    const handleUserBlockUnblock = async (id: string, isActive: string) => {
        console.log(id)
        const newStatus = isActive === "ACTIVE" ? "BLOCKED" : "ACTIVE";
        try {
            const res = await updateActivityStatus({ id, userInfo: { isActive: newStatus } }).unwrap()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDriverApproval = async (id: string, isApproved: boolean) => {
        console.log(id)
        try {
            const newStatus = isApproved === true ? false : true;
            const res = await updateDriverApproval({ id, userInfo: { isApproved: newStatus } }).unwrap()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
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
            {data?.data.length === 0 ? <p className="text-center mt-20 text-muted-foreground">No users have been created yet.</p>
                : <div className="p-4">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-5">
                        <div>
                            <Label className="mb-2">Find by role</Label>
                            <Select onValueChange={handleFilterByRole} >
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Find by role</SelectLabel>
                                        <SelectItem value="ALL">
                                            All
                                        </SelectItem>
                                        <SelectItem value="RIDER">
                                            Rider
                                        </SelectItem>
                                        <SelectItem value="DRIVER">
                                            Driver
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <Form {...form}>
                            <form className="flex items-end" onSubmit={form.handleSubmit(onSubmit)}>

                                <FormField
                                    control={form.control}
                                    name="search"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Search User</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="rounded-r-none w-48"
                                                    placeholder="Search"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" size={"sm"} className="rounded-l-none h-[41px] flex items-center gap-1">
                                    <span>Search</span>
                                    <span><Search size={15} /></span>
                                </Button>
                            </form>
                        </Form>
                    </div>
                    <Table className="my-5">
                        <TableHeader>
                            <TableRow className="hover:bg-transparent text-nowrap">
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.data?.map((item: IUser) => (
                                <TableRow key={item._id} className="text-nowrap">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-medium">{item.name}</div>
                                                <span className="text-muted-foreground mt-0.5 text-xs">
                                                    {item.role}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.isActive}</TableCell>
                                    <TableCell>{(item.role === "DRIVER" as TRole) && (item.isApproved ? "Approved" : "Suspend")}</TableCell>
                                    <TableCell onClick={() => handleDriverApproval(item._id as string, item.isApproved as boolean)}>{(item.role === "DRIVER" as TRole) ? (item.isApproved ? <Button size={"sm"} className="w-28">Suspend</Button> : <Button size={"sm"} className="w-28">Approved</Button>) : "Not a driver"}</TableCell>
                                    <TableCell onClick={() => handleUserBlockUnblock(item._id as string, item.isActive as string)} >{item.isActive === "BLOCKED" ? <Button size={"sm"} className="w-28">Unblock user</Button> : <Button size={"sm"} className="w-28">Block user</Button>} </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>}

        </div>
    )
}
