"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <div className="space-y-4">
      <Image
        src={images[selectedImage]}
        alt="Product Image"
        width={1000}
        height={1000}
        className="min-h-[300px] object-cover object-center "
      />
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={image}
            className={cn(
              "cursor-pointer border mr-2 hover:border-orange-600",
              selectedImage === index && "border-orange-500"
            )}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image}
              alt={`Product Image ${index + 1}`}
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
