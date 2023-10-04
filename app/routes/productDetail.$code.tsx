import { json, LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Product } from '../types/product';
import Rating from "~/components/rating";
import "./../components/productDetail.css";

export const loader = async ({ params }: LoaderArgs) => {
    const productCode = params.code; // URL'den "code" parametresini alın
    console.log(productCode);
  try {
    // Verileri belirtilen URL'den alın
    const apiUrl = `https://mocki.io/v1/1a1fb542-22d1-4919-914a-750114879775?code=${productCode}`;
    console.log(apiUrl);
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Verileri uygun bir şekilde işleyin
    const product: Product = {
      code: productCode,
      imageUrl: data.result.imageUrl,
      price: data.result.price,
      rating: data.result.rating,
      mkName:data.result.mkName,
      productName:data.result.productName,
      badge:data.result.badge,
      storageOptions:data.result.storageOptions,
      countOfPrices:data.result.countOfPrices,
      freeShipping:data.result.freeShipping,
      lastUpdate:data.result.lastUpdate
    };

    return  product;
  } catch (error) {
    console.error("Veriler alinirken bir hata oluştu:", error);
    return json({ error: "Veriler alinamadi." }, { status: 500 });
  }
};

export default function productDetail() {
  const product = useLoaderData<typeof loader>();
  if (!product) {
    return <div>Yükleniyor...</div>;
  }


  return (
    <div>
      <h1>Ürün Detayi</h1>
      <p>{product.mkName}</p><Rating rating={product.rating} />
      <p>{product.name}</p>
      <p>{product.badge}</p>
      <img src={product.imageUrl} alt="Ürün Resmi" />
      <div>
        <p> Kapasite Seçenekleri</p>
        {product.storageOptions.map((item, index) => (
        <div key={index} className="box">{item}</div>
      ))}
      </div>
      {/* todo: kapasite Secenekleri koyulacak */}
      <p>{product.countOfPrices} satici içinde kargo dahil en ucuz fiyat secenegi</p>
      <p>{product.price} TL</p>
      <p>Son güncelleme: { product.lastUpdate} </p>
      {/* Diğer ürün bilgilerini buraya ekleyin */}
      <Link to="/productList">Geri Dön</Link>

    </div>
  );
}
