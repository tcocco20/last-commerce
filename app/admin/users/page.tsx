import DeleteDialog from "@/components/shared/DeleteDialog";
import Pagination from "@/components/shared/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteUser, getAllUsers } from "@/lib/actions/user.actions";
import { formatId } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Users",
  description: "Manage users in the admin panel",
};

const AdminUsersPage = async (props: {
  searchParams: Promise<{
    page: string;
  }>;
}) => {
  const { page = "1" } = await props.searchParams;

  const users = await getAllUsers({ page: Number(page) });

  if (!users) {
    throw new Error("No users found");
  }

  return (
    <div className="space-y-2">
      <h2 className="h2-bold">Users</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>EMAIL</TableHead>
              <TableHead>ROLE</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users!.data!.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{formatId(user.id)}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.role === "user" ? (
                    <Badge variant="secondary">User</Badge>
                  ) : (
                    <Badge variant="default">Admin</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button asChild variant="outline" size={"sm"}>
                    <Link href={`/admin/users/${user.id}`}>
                      <span className="text-blue-600">Edit</span>
                    </Link>
                  </Button>
                  <DeleteDialog id={user.id} action={deleteUser} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {users!.totalPages! > 1 && (
          <Pagination
            totalPages={users!.totalPages!}
            currentPage={page ? Number(page) : 1}
          />
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
