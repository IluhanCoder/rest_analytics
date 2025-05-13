import { buttonStyle } from "../styles/button-styles";
import ProductsCatalogue from "./products-catalogue";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-green-800 tracking-wide mb-3 uppercase">
            меню
          </h1>
          <p className="text-gray-700 text-lg">
            Смак справжньої Італії – щодня у вашій тарілці
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-xl p-6">
          <ProductsCatalogue deleteAvailable={localStorage.getItem("role") === "admin"} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
