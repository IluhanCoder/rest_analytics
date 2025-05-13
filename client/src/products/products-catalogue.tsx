import { useState, useEffect } from "react";
import { Product, ProductFilter } from "./product-types";
import productService from "./product-service";
import { Buffer } from "buffer";
import ProductSearchBar from "./product-search-bar";
import CharacteristicsMapper from "./characteristics-mapper";
import { cardStyle } from "../styles/card-styles";
import { buttonStyle, deleteButtonStyle } from "../styles/button-styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type LocalParams = {
  isPicker?: boolean;
  onPick?: (picketProduct: Product) => {};
  deleteAvailable?: boolean;
};
const ProductsCatalogue = ({ isPicker, onPick, deleteAvailable }: LocalParams) => {
  const [products, setProducts] = useState<Product[]>();
  const defaultImage = process.env.REACT_APP_IMAGE_PLACEHOLDER;

  const fetchProducts = async () => {
    try {
      const res = await productService.fetchProducts();
      setProducts(res);
    } catch (error: any) {
      if (error.status === 401) toast.error("ви маєте бути авторизованими!");
      else toast.error(error.message);
    }
  };

  const handleFilter = async (filter: ProductFilter) => {
    setProducts(undefined);
    const newProducts = await productService.filterProducts(filter);
    setProducts(newProducts);
  };

  const handleDelete = async (productId: string) => {
    await productService.deleteProduct(productId);
    toast.success("товар успішно видалено");
    await fetchProducts();
  };

  const convertImage = (image: any) => {
    if (!image) return defaultImage;
    return `data:image/jpeg;base64,${Buffer.from(image.data).toString("base64")}`;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col">
      <ToastContainer />
      <div className="mb-6">
        <ProductSearchBar onSubmit={handleFilter} />
      </div>

      {products === undefined ? (
        <div className="text-center text-2xl text-gray-500 mt-16">Підвантаження страв...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-2xl text-gray-500 mt-16">Товари відсутні</div>
      ) : (
        <div className={`grid ${isPicker ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"} gap-6 px-4`}>
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between hover:shadow-2xl transition duration-200"
            >
              <h2 className="text-center text-2xl font-semibold text-green-800">{product.name}</h2>

              {!isPicker && (
                <div className="flex justify-center my-4">
                  <img
                    src={convertImage(product.image)}
                    alt={product.name}
                    className="max-h-48 object-cover rounded-xl shadow"
                  />
                </div>
              )}

              <div className="text-sm text-gray-600 space-y-2 mt-2">
                <div>
                  <span className="font-semibold text-gray-800">Категорія:</span> {product.category}
                </div>

                {!isPicker && (
                  <div>
                    <span className="font-semibold text-gray-800">Опис:</span> {product.description}
                  </div>
                )}
              </div>

              {!isPicker && (
                <div className="mt-3">
                  <h3 className="text-center font-semibold text-green-700">Характеристики</h3>
                  <CharacteristicsMapper characteristics={product.characteristics} />
                </div>
              )}

              <div className="flex justify-center mt-4">
                {isPicker ? (
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                    onClick={() => onPick!(product)}
                  >
                    обрати товар
                  </button>
                ) : (
                  <div className="text-lg font-semibold text-center">
                    <span className="text-gray-700">Ціна: </span>
                    <span className="text-green-700">{product.price} грн</span>
                  </div>
                )}
              </div>

              {deleteAvailable && (
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    onClick={() => handleDelete(product.id)}
                  >
                    видалити товар
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default ProductsCatalogue;
