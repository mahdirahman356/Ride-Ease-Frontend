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

export default function ManageUsers() {

    const form = useForm()

    const [filter, setFilter] = useState("ALL")
    const [searchTerm, setSearchTerm] = useState("")

    const queryParam: Record<string, string> = {}
    if (filter !== "ALL") queryParam.role = filter
    if (searchTerm) queryParam.searchTerm = searchTerm

    const { data } = useGetAllUsersQuery(queryParam)
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

    return (
        <div>
            <div className="flex items-end gap-2">
                <div>
                    <Label className="mb-2">Find by role</Label>
                    <Select onValueChange={handleFilterByRole} >
                        <SelectTrigger className="w-36">
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
                                            className="rounded-r-none"
                                            placeholder="Search"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="rounded-l-none">Search</Button>
                    </form>
                </Form>
            </div>
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
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
                        <TableRow key={item._id}>
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
                            <TableCell onClick={() => handleDriverApproval(item._id as string, item.isApproved as boolean)}>{(item.role === "DRIVER" as TRole) && (item.isApproved ? <Button>Suspend</Button> : <Button>Approved</Button>)}</TableCell>
                            <TableCell onClick={() => handleUserBlockUnblock(item._id as string, item.isActive as string)} >{item.isActive === "BLOCKED" ? <Button>Unblock user</Button> : <Button>Block user</Button>} </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
