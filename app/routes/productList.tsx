import { Link, LoaderFunction, useLoaderData } from '@remix-run/react';
import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import "./../components/productList.css";

export const loader: LoaderFunction = async () => {
  const response = await fetch("https://mocki.io/v1/59906f35-d5d5-40f7-8d44-53fd26eb3a05");
  const data = await response.json();
  return { horizontalProducts: data.result.horizontalProducts, nextUrl: data.result.nextUrl };
};

type ApiResponse = {
  horizontalProducts: Product[];
  nextUrl: string | null;
};

function ProductList() {
  const { horizontalProducts, nextUrl }: ApiResponse = useLoaderData();

  const [products, setProducts] = useState<Product[]>([]);
  const [loadMoreUrl, setLoadMoreUrl] = useState<string | null>(nextUrl);

  useEffect(() => {
    setProducts(horizontalProducts);
    setLoadMoreUrl(nextUrl);
  }, [horizontalProducts, nextUrl]);

  const loadMore = async () => {
    if (loadMoreUrl) {
      const response = await fetch(loadMoreUrl);
      const newData = await response.json();
      setProducts((prevProducts) => [...prevProducts, ...newData.result.products]);
      setLoadMoreUrl(newData.result.nextUrl);
    }
  };

  const groupedProducts = [];
  for (let i = 0; i < products.length; i += 2) {
    const firstProduct = products[i];
    const secondProduct = products[i + 1];
    groupedProducts.push([firstProduct, secondProduct]);
  }

  return (
    <div className="vertical-scroll">
      {groupedProducts.map((productPair, index) => (
        <div className="product-pair" key={index}>
          {productPair.map((product) => (
            <div className="product" key={product.code} >
              <Link to={`/productDetail/${product.code}`}>
                <img src={product.imageUrl} alt={product.name} />
              </Link>
              <p>{product.name}</p>
              <p>{product.price} TL</p>
              <p>{product.followCount} +takip</p>
            </div>
          ))}
        </div>
      ))}
      {loadMoreUrl && (
        <button onClick={loadMore}>Daha Fazla Yükle</button>
      )}
    </div>
  );
}

export default ProductList;
