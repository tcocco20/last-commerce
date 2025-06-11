import ProductList from "@/components/shared/Product/ProductList";
import sampleData from "@/db/sample-data";
import { getLatestProducts } from "@/lib/actions/product.actions";

const HomePage = async () => {
  const latestProduct = await getLatestProducts();
  return (
    <>
      <ProductList data={latestProduct} title="Newest Arrivals" limit={4} />
    </>
  );
};

export default HomePage;
