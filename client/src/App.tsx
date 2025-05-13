import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./misc/welcome-page";
import ProductsPage from "./products/products-page";
import NewProductPage from "./products/new-product-page";
import SignupPage from "./auth/signup-page";
import LoginPage from "./auth/login-page";
import NewTransactionPage from "./transactions/new-transaction-page";

import { registerLocale, setDefaultLocale } from "react-datepicker";
import uk from "date-fns/locale/uk";
import TransactionsPage from "./transactions/transactions-page";
import AnalyticsPage from "./analytics/analytics-page";
import PredictionPage from "./prediction/prediction-page";
import PairsPage from "./pairs/pairs-page";
import { Link } from "react-router-dom";
import { linkStyle } from "./styles/link-styles";
import { useEffect } from "react";
import { setHeader } from "./axios-setup";
import InfoPage from "./info-page";
registerLocale("ua", uk);

function App() {
  useEffect(() =>  {
    if(localStorage.getItem("token")) setHeader();
  }, [])

  return (
    <BrowserRouter>
      <header className="flex items-center justify-between px-10 py-4 border-b shadow-sm bg-white">
  <div className="text-2xl font-bold tracking-wide text-green-700">
    Tramonto
  </div>
  <nav className="flex gap-6 text-gray-700 text-sm font-medium">
    <Link to="products" className="hover:text-green-500 transition-colors">меню</Link>

    {localStorage.getItem("role") === "admin" && (
      <>
        <Link to="new-product" className="hover:text-green-500 transition-colors">нова позиція</Link>
        <Link to="transactions" className="hover:text-green-500 transition-colors">чеки</Link>
        <Link to="prediction" className="hover:text-green-500 transition-colors">статистика</Link>
        <Link to="analytics" className="hover:text-green-500 transition-colors">аналітика</Link>
        <Link to="pairs" className="hover:text-green-500 transition-colors">шаблонні замовлення</Link>
      </>
    )}

    <Link to="/" className="hover:text-green-500 transition-colors">обліковий запис</Link>
  </nav>
</header>

      <Routes>
        <Route index element={<WelcomePage />} />
        <Route path="info" element={<InfoPage/>}/>
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="new-product" element={<NewProductPage />} />
        <Route path="new-transaction" element={<NewTransactionPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="prediction" element={<PredictionPage />} />
        <Route path="pairs" element={<PairsPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
