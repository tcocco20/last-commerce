"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { productDefaultValues } from "@/lib/constants";
import { Product } from "@/lib/types";
import { insertProductSchema, updateProductSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import slugify from "slugify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: "Create" | "Update";
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver:
      type === "Update"
        ? zodResolver(updateProductSchema)
        : (zodResolver(insertProductSchema) as any),
    defaultValues:
      product && type === "Update" ? product : productDefaultValues,
  });
  
    const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (
        values
    ) => {
        console.log("Form submitted with values:", values);
        if (type === "Create") {
            const res = await createProduct(values);
            if (res.success) {
                toast.success(res.message);
                router.push("/admin/products");
            } else {
                toast.error(res.error, {richColors: true});
            }
        }
        if (type === "Update") {
            const res = await updateProduct({id: productId!, ...values});
            if (res.success) {
                toast.success(res.message);
                router.push("/admin/products");
            } else {
                toast.error(res.error, {richColors: true});
            }
        }
    }

  return (
    <Form {...form}>
      <form className="space-y-8" method="POST" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 md:flex-row items-start">
            <FormField
            control={form.control}
            name="name"
            render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, "name">}) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input {...field} type="text" placeholder="Enter Product Name" className="input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
             />
            <FormField
            control={form.control}
            name="slug"
            render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, "slug">}) => (
              <FormItem className="w-full">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                    <div className="relative">

                    <Input {...field} type="text" placeholder="Enter Product Slug" className="input" />
                    <Button type="button" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2" onClick={() => {
                        form.setValue("slug", slugify(form.getValues("name"), { lower: true }));
                    }}>
                      Generate
                    </Button>
                    </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
             />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
            <FormField
            control={form.control}
            name="category"
            render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, "category">}) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                    <Input {...field} type="text" placeholder="Enter Product Category" className="input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
             />
             <FormField
            control={form.control}
            name="brand"
            render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, "brand">}) => (
              <FormItem className="w-full">
                <FormLabel>Brand</FormLabel>
                <FormControl>
                    <Input {...field} type="text" placeholder="Enter Product Brand" className="input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
             />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
            <FormField
            control={form.control}
            name="price"
            render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, "price">}) => (
              <FormItem className="w-full">
                <FormLabel>Price</FormLabel>
                <FormControl>
                    <Input {...field} type="text" placeholder="Enter Product Price" className="input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
             />
             <FormField
            control={form.control}
            name="stock"
            render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, "stock">}) => (
              <FormItem className="w-full">
                <FormLabel>Stock</FormLabel>
                <FormControl>
                    <Input {...field} type="text" placeholder="Enter Product Stock" className="input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
             />
        </div>
        <div className="upload-field flex flex-col gap-5 md:flex-row"></div>
        <div className="upload-field"></div>
        <div>
            <FormField
            control={form.control}
            name="description"
            render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, "description">}) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                    <Textarea {...field} placeholder="Enter Product Description" className="resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
             />
        </div>
        <div>
            <Button type="submit" size={"lg"} disabled={form.formState.isSubmitting} className="w-full col-span-2 cursor-pointer">
                {form.formState.isSubmitting ? "Saving..." : `${type} Product`}
            </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
