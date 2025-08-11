"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateUser } from "@/lib/actions/user.actions";
import { USER_ROLES } from "@/lib/constants";
import { updateUserSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const UpdateUserForm = ({
  user,
}: {
  user: z.infer<typeof updateUserSchema>;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
  });
  const onSubmit = async(values: z.infer<typeof updateUserSchema>) => {
    try {
        const res = await updateUser({ ...values, id: user.id });
        if (!res.success) {
            toast.error(res.message, {
                richColors: true,
            });
        }

        toast.success("User updated successfully");

        form.reset();
        
        router.push("/admin/users");
    } catch (error) {
      toast.error((error as Error).message, {
        richColors: true,
      });
    }
  }

  return <Form {...form}>
    <form method="POST" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
            <FormField
                control={form.control}
                name="email"
                render={({field}: { field: ControllerRenderProps<z.infer<typeof updateUserSchema>, "email">}) => (
                    <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>

                    <FormControl>
                    <Input
                        {...field}
                        disabled
                        type="text"
                        placeholder="Enter User Email"
                        className="input"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
        <div>
            <FormField
                control={form.control}
                name="name"
                render={({field}: { field: ControllerRenderProps<z.infer<typeof updateUserSchema>, "name">}) => (
                    <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>

                    <FormControl>
                    <Input
                        {...field}
                        type="text"
                        placeholder="Enter User Name"
                        className="input"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
        <div>
            <FormField
                control={form.control}
                name="role"
                render={({field}: { field: ControllerRenderProps<z.infer<typeof updateUserSchema>, "role">}) => (
                    <FormItem className="w-full">
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value.toString()} >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {USER_ROLES.map((role) => (
                                <SelectItem key={role} value={role}>
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
        <div className="flex-between">
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Submitting..." : "Update User"}</Button>
        </div>
    </form>
  </Form>;
};

export default UpdateUserForm;
