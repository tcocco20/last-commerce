"use client";

import { updateUserSchema } from "@/lib/validators";
import { z } from "zod";

const UpdateUserForm = ({
  user,
}: {
  user: z.infer<typeof updateUserSchema>;
}) => {
  return <>UpdateUserForm</>;
};

export default UpdateUserForm;
