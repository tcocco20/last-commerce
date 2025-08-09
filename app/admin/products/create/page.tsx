import { Metadata } from "next";
import ProductForm from "./ProductForm";

export const metadata: Metadata = {
  title: "Create Product",
  description: "Create a new product",
};

const CreateProductPage = () => {
  return (
    <>
      <h1 className="h2-bold">Create Product</h1>
      <div className="my-8">
        <ProductForm type="Create" />
      </div>
    </>
  );
};

export default CreateProductPage;
