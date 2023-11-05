import { useParams, useNavigate } from "react-router-dom";
import "./Shop.css";
import Navigation from "../Navigation/Navigation";
import { useEffect, useState } from "react";
import { DataTransfer } from "../Shopping-cart/Shopping-cart";

export default function Shop({ APIData }) {
  const [productCategory, setproductCategory] = useState("All");
  const { page } = useParams();
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const [howManyPages, setHowManyPages] = useState(0);
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  function isAPIDataHere(runIfDataHere) {
    return APIData.error !== null ? (
      <div className="errorMsg">APIData.error</div>
    ) : APIData.loading === true ? (
      <div className="Loading">Loading...</div>
    ) : (
      runIfDataHere()
    );
  }

  function generateCards() {
    if (products === null) {
      let productsArray = [];
      if (productCategory !== "All") {
        APIData.data.forEach((product) => {
          if (product.category === productCategory) {
            if (productsArray.length === 0) {
              productsArray.push([]);
            } else if (productsArray[productsArray.length - 1].length > 7) {
              productsArray.push([]);
            }
            console.log(productsArray);
            productsArray[productsArray.length - 1].push(
              <SingleProductCard
                id={product.id}
                key={product.id}
                title={product.title}
                price={product.price}
                rating={product.rating.rate}
                count={product.rating.count}
                image={product.image}
              />
            );
          }
        });
      } else if (productCategory === "All") {
        APIData.data.forEach((product) => {
          if (productsArray.length === 0) {
            productsArray.push([]);
          } else if (productsArray[productsArray.length - 1].length > 7) {
            productsArray.push([]);
          }
          productsArray[productsArray.length - 1].push(
            <SingleProductCard
              id={product.id}
              key={product.id}
              title={product.title}
              price={product.price}
              rating={product.rating.rate}
              count={product.rating.count}
              image={product.image}
              getData={addToCartFunctionality}
            />
          );
        });
      }
      setProducts(productsArray);
    }
    if (howManyPages === 0 && products !== null) {
      setHowManyPages(products.length);
    }
    if (products !== null) {
      return products[currentPage - 1];
    }
  }

  function categories() {
    let categoryList = [];
    APIData.data.forEach((item) => {
      if (!categoryList.includes(item.category)) {
        categoryList.push(item.category);
      }
    });
    return (
      <select
        name="selectProducts"
        id="selectProducts"
        value={productCategory}
        onChange={(e) => {
          setproductCategory(e.target.value);
        }}
      >
        <option key={0} value="All">
          All
        </option>
        {categoryList.map((item, i) => {
          return (
            <option key={i + 1} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    );
  }
  function nextPage() {
    if (currentPage < howManyPages) {
      setCurrentPage(currentPage + 1);
      navigate("/shop/" + (currentPage + 1));
    }
  }
  function previousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      navigate("/shop/" + (currentPage - 1));
    }
  }
  useEffect(() => {
    if (data !== null) {
      setData(null);
    }
  }, [data]);
  function addToCartFunctionality(id, title, price, quantity, image) {
    const newData = {
      id: id,
      title: title,
      price: price,
      quantity: quantity,
      image: image,
    };
    setData(newData);
  }

  return (
    <div className="shopPage">
      <Navigation />
      <div className="shopPageContent">
        <h1>Shop</h1>
        <div className="shopPageProductsNavigation">
          <p>Products - </p>
          {isAPIDataHere(categories)}
        </div>
        <div className="shopProducts">
          {page == currentPage ? isAPIDataHere(generateCards) : <>???</>}
        </div>
        <div className="linksToOtherPages">
          <button type="button" onClick={previousPage}>
            --
          </button>
          <p>Page: {currentPage + "/" + howManyPages}</p>
          <button type="button" onClick={nextPage}>
            ++
          </button>
        </div>
      </div>
      {data === null ? null : <DataTransfer data={data} />}
    </div>
  );
}

function SingleProductCard({
  id,
  title,
  price,
  rating,
  count,
  image,
  getData,
}) {
  const [productCount, setProductCount] = useState(1);

  function increaseProductCount() {
    if (productCount < count) {
      setProductCount(productCount + 1);
    }
  }
  function decreaseProductCount() {
    if (productCount > 1) {
      setProductCount(productCount - 1);
    }
  }

  return (
    <div className="productCard" key={id}>
      <div className="productImageContainer">
        <img className="productImage" src={image} alt="Product Image" />
      </div>
      <p className="productTitle" style={{ fontSize: "1.1rem" }}>
        {title}
      </p>
      <p className="productPrice" style={{ fontSize: "1.4rem" }}>
        $ {price}
      </p>
      <p className="productRating">Rating {rating} / 5</p>
      <p className="productCount">In Stock: {count}</p>
      <div className="addingProductsToCart">
        <div className="howManyItems">
          <div className="minusProduct" onClick={decreaseProductCount}>
            -
          </div>
          <div className="productAddCount">{productCount}</div>
          <div className="plusProduct" onClick={increaseProductCount}>
            +
          </div>
        </div>
        <button
          className="addProductToCart"
          onClick={() => {
            getData(id, title, price, productCount, image);
          }}
        >
          Add To cart
        </button>
      </div>
    </div>
  );
}
