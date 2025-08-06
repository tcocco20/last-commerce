"use client";

import { Form } from "@/components/ui/form";
import { productDefaultValues } from "@/lib/constants";
import { Product } from "@/lib/types";
import { insertProductSchema, updateProductSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="flex flex-col gap-5 md:flex-row"></div>
        <div className="flex flex-col gap-5 md:flex-row"></div>
        <div className="flex flex-col gap-5 md:flex-row"></div>
        <div className="upload-field flex flex-col gap-5 md:flex-row"></div>
        <div className="upload-field"></div>
        <div></div>
        <div></div>
      </form>
    </Form>
  );
};

export default ProductForm;
