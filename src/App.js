import logo from "./logo.svg";
import "./App.css";
import Category from "./Category";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  let [finalCategory, setfinalCategory] = useState([]);
  let [finalProduct, setfinalProduct] = useState([]);
  let [catName, setCatName] = useState("");
  let getCategory = () => {
    axios
      .get("https://dummyjson.com/products/category-list")
      .then((res) => res.data)
      .then((finalRes) => {
        setfinalCategory(finalRes);
      });
  };

  let getProducts = () => {
    axios
      .get("https://dummyjson.com/products")
      .then((proRes) => proRes.data)
      .then((finalRes) => {
        setfinalProduct(finalRes.products);
      });
  };

  useEffect(() => {
    getCategory();
    getProducts();
  }, []);

  useEffect(() => {
    if (catName !== "") {
      axios
        .get(`https://dummyjson.com/products/category/${catName}`)
        .then((proRes) => proRes.data)
        .then((finalRes) => {
          setfinalProduct(finalRes.products);
        });
    }
  }, [catName]);

  let Pitems = finalProduct.map((products, index) => {
    return <ProductItems key={index} pdata={products} />;
  });
  return (
    <>
      <div className="py-[40px]">
        <div className="max-w-[1320px] mx-auto">
          <h1 className="text-center text-[40px] font-bold mb-[30px]">
            Our Products
          </h1>
          <div className="grid grid-cols-[30%_auto] gap-[20px]">
            <div>
              <Category finalCategory={finalCategory} setCatName={setCatName} />
            </div>
            <div>
              <div className="grid grid-cols-3 gap-4">
                {finalProduct.length >= 1 ? Pitems : "No Product Found"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

function ProductItems({ pdata }) {
  return (
    <div className="shadow-lg text-center pb-4">
      <img src={pdata.thumbnail} />
      <h4>{pdata.title}</h4>
      <b>Rs {pdata.price}</b>
    </div>
  );
}
