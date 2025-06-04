import ProductList from "@/components/shared/Product/ProductList";
import sampleData from "@/db/sample-data";

const HomePage = () => {
  return (
    <>
      <ProductList data={sampleData.products} title="Newest Arrivals" />
    </>
  );
};

export default HomePage;
