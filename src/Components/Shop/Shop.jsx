import { useParams, useNavigate } from "react-router-dom";
import "./Shop.css";
import Navigation from "../Navigation/Navigation";
import { useEffect, useState } from "react";

export default function Shop({
  APIData,
  addToCartFunctionality,
  productsInCartQuantity,
}) {
  const [productCategory, setproductCategory] = useState("All");
  const { page } = useParams();
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const [howManyPages, setHowManyPages] = useState(0);
  const navigate = useNavigate();

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
            } else if (productsArray[productsArray.length - 1].length > 5) {
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
                addToCartFunctionality={addToCartFunctionality}
              />
            );
          }
        });
      } else if (productCategory === "All") {
        APIData.data.forEach((product) => {
          if (productsArray.length === 0) {
            productsArray.push([]);
          } else if (productsArray[productsArray.length - 1].length > 5) {
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
              addToCartFunctionality={addToCartFunctionality}
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
          setProducts(null);
          setHowManyPages(0);
          setCurrentPage(1);
          navigate("/shop/" + 1);
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

  return (
    <div className="shopPage">
      <Navigation productsInCartQuantity={productsInCartQuantity} />
      <div className="shopPageContent">
        <h1>Shop</h1>
        <div className="shopPageProductsNavigation">
          <p>Products - </p>
          {isAPIDataHere(categories)}
        </div>
        <div className="shopProducts">
          {page == currentPage ? isAPIDataHere(generateCards) : null}
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
  addToCartFunctionality,
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
          <div
            className="minusProduct"
            onClick={decreaseProductCount}
            data-testid={"minusProduct"}
          >
            -
          </div>
          <div className="productAddCount" data-testid={"count"}>
            {productCount}
          </div>
          <div
            className="plusProduct"
            data-testid={"plusProduct"}
            onClick={increaseProductCount}
          >
            +
          </div>
        </div>
        <button
          className="addProductToCart"
          onClick={() => {
            addToCartFunctionality(
              id,
              title,
              price,
              productCount,
              image,
              count
            );
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
export { SingleProductCard };
