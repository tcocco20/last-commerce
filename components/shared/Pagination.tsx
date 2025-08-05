"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";

interface PaginationProps {
  totalPages: number;
  currentPage: number | string;
  urlParamName?: string;
}

const Pagination = ({
  totalPages,
  currentPage,
  urlParamName = "page",
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (direction: "next" | "prev") => {
    const pageValue =
      direction === "next" ? Number(currentPage) + 1 : Number(currentPage) - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: String(pageValue),
    });

    router.push(newUrl);
  };

  return (
    <div className="flex gap-2">
      <Button
        size="lg"
        variant={"outline"}
        disabled={currentPage === 1}
        onClick={() => handleClick("prev")}
      >
        Previous
      </Button>
      <Button
        size="lg"
        variant={"outline"}
        disabled={Number(currentPage) >= totalPages}
        onClick={() => handleClick("next")}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
