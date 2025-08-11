"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

const AdminSearch = () => {
  const pathname = usePathname();
  const formActionUrl = pathname.includes("/admin/orders")
    ? "/admin/orders"
    : pathname.includes("/admin/users")
    ? "/admin/users"
    : "/admin/products";

  const searchParams = useSearchParams();
  const [queryValue, setQueryValue] = useState(searchParams.get("query") || "");

  useEffect(() => {
    setQueryValue(searchParams.get("query") || "");
  }, [searchParams]);
  return (
    <form action={formActionUrl}>
      <Input
        type="search"
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
        placeholder="Search..."
        name="query"
        className="md:w-[100px] lg:w-[300px]"
      />
      <button type="submit" className="sr-only">
        Search
      </button>
    </form>
  );
};

export default AdminSearch;
