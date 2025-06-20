import ProductList from "@/components/shared/Product/ProductList";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { Product } from "@/lib/types";

const HomePage = async () => {
  const latestProduct = (await getLatestProducts()) as Product[];
  return (
    <>
      <ProductList data={latestProduct} title="Newest Arrivals" limit={4} />
    </>
  );
};

export default HomePage;
