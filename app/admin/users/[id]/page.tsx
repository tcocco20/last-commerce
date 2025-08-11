import { getUserById } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import UpdateUserForm from "./UpdateUserForm";
import { z } from "zod";
import { updateUserSchema } from "@/lib/validators";

export const metadata: Metadata = {
  title: "Update User",
  description: "Update user details in the admin panel",
};

const UpdateUserPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  console.log("User data:", user);

  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <h2 className="h2-bold">Update User</h2>
      <UpdateUserForm user={user as z.infer<typeof updateUserSchema>} />
    </div>
  );
};

export default UpdateUserPage;
