import ProductImages from "@/components/shared/Product/ProductImages";
import ProductPrice from "@/components/shared/Product/ProductPrice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import React from "react";

const ProductDetailsPage = async (props: {
  params: Promise<{
    slug: string;
  }>;
}) => {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="col-span-2">
            <ProductImages images={product.images} />
          </div>
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <p>
                {product.brand} {product.category}
              </p>
              <h1 className="h3-bold">{product.name}</h1>
              <p>
                {product.rating} of {product.numReviews} Reviews
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <ProductPrice
                  value={Number(product.price)}
                  className="w-24 rounded-full bg-green-100 text-green-700 px-5 py-2"
                />
              </div>
            </div>
            <div className="mt-10">
              <p className="font-semibold">Description</p>
              <p>{product.description}</p>
            </div>
          </div>
          <div>
            <Card>
              <CardContent className="p-4">
                <div className="mb-2 flex-justify-between">
                  <div>Price</div>
                  <div>
                    <ProductPrice value={Number(product.price)} />
                  </div>
                </div>
                <div className="mb-2 flex-justify-between">
                  <div>Status</div>
                  <div>
                    {product.stock > 0 ? (
                      <Badge variant="outline">In Stock</Badge>
                    ) : (
                      <Badge variant="destructive">Unavailable</Badge>
                    )}
                  </div>
                </div>
                {product.stock > 0 && (
                  <div className="flex-center">
                    <Button className="w-full">Add To Cart</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsPage;
