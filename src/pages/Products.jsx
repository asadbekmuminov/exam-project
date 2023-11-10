import Loading from "../components/Loading";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiGridAlt } from "react-icons/bi";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import FormRange from "../components/FormRange";
import FormCheckbox from "../components/FormCheckBox";
function Products() {
  const list = ["all", "Tables", "Chairs", "Kids", "Sofas", "Beds"];
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [company, setCompany] = useState("all");
  const [order, setOrder] = useState("a-z");
  const [price, setPrice] = useState("100000");
  const [shipping, setShipping] = useState(false);

  const listCompany = [
    "all",
    "Modenza",
    "Luxora",
    "Artifex",
    "Comfora",
    "Homestead",
  ];
  const [page, setPage] = useState(1);

  const [styleList, setStyleList] = useState(false);
  const { data, isPending, error } = useFetch(
    `https://strapi-store-server.onrender.com/api/products?page=${page}`
  );

  return (
    <div>
      {data ? (
        <div>
          <form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center mb-10">
            <FormInput
              type="search"
              label="search product"
              name="search"
              size="input-sm"
              defaultValue={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <FormSelect
              label="select category"
              name="category"
              list={list}
              size="select-sm"
              defaultValue={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <FormSelect
              label="select company"
              name="company"
              list={listCompany}
              size="select-sm"
              defaultValue={company}
              onChange={(e) => setCompany(e.target.value)}
            />

            <FormSelect
              label="sort by"
              name="order"
              list={["a-z", "z-a", "high", "low"]}
              size="select-sm"
              defaultValue={order}
              onChange={(e) => setOrder(e.target.value)}
            />

            <FormRange
              name="price"
              label="select price"
              size="range-sm"
              price={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <FormCheckbox
              name="shipping"
              label="free shipping"
              size="checkbox-sm"
              defaultValue={shipping}
              onChange={(e) => setShipping(e.target.checked)}
            />

            <button type="submit" className="btn btn-accent btn-sm">
              search
            </button>

            <Link to="/products" className="btn btn-error btn-sm">
              reset
            </Link>
          </form>
          <div>
            <div className="flex justify-between border-b border-black mb-7">
              <h1 className="text-xl font-semibold mb-5">
                {data.meta.pagination.total} products
              </h1>
              <div className="flex items-center gap-5 mb-5">
                <button
                  onClick={() => setStyleList(true)}
                  className={styleList && "btn rounded-full btn-accent "}
                >
                  <BiGridAlt className="text-[20px]" />
                </button>
                <button
                  onClick={() => setStyleList(false)}
                  className={!styleList && "btn rounded-full btn-accent "}
                >
                  <GiHamburgerMenu className="text-[20px]" />
                </button>
              </div>
            </div>

            {styleList ? (
              <ul className="gap-5 grid lg:grid-cols-3 sm:grid-cols-2 mb-10">
                {data.data.map((product) => {
                  return (
                    <li
                      key={product.id}
                      className="card max-w-96  bg-base-100 shadow-xl text-center flex flex-col justify-center"
                    >
                      <Link to={`/productpage/${product.id}`}>
                        <figure className="mx-auto px-5 pt-5">
                          <img
                            src={product.attributes.image}
                            alt="Shoes"
                            className="rounded-xl object-cover h-[200px] w-full  mx-auto"
                          />
                        </figure>
                        <div className="card-body items-center text-center">
                          <h2 className="card-title">
                            {product.attributes.title.toUpperCase()}
                          </h2>
                          <p className="text-teal-600">
                            ${" "}
                            {parseFloat(
                              product.attributes.price.toString().slice(0, -2) +
                                "." +
                                product.attributes.price.toString().slice(-2)
                            )}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <ul className="flex flex-col gap-5 mb-5">
                {data.data.map((product) => {
                  return (
                    <li
                      key={product.id}
                      className="card w-full  bg-base-100 shadow-xl text-center flex "
                    >
                      <Link
                        className="flex gap-5 f"
                        to={`/productpage/${product.id}`}
                      >
                        <figure className="mx-auto p-5">
                          <img
                            src={product.attributes.image}
                            alt="Shoes"
                            className="rounded-xl object-cover h-[150px] w-[150px]  "
                          />
                        </figure>
                        <div className="card-body flex-col ">
                          <div className="flex flex-col items-start ">
                            <h2 className="card-title">
                              {product.attributes.title.toUpperCase()}
                            </h2>
                            <p>{product.attributes.company}</p>
                          </div>
                          <div className="ml-auto flex  items-start h-full">
                            <p className="text-teal-600 mb-auto">
                              ${" "}
                              {parseFloat(
                                product.attributes.price
                                  .toString()
                                  .slice(0, -2) +
                                  "." +
                                  product.attributes.price.toString().slice(-2)
                              )}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
            <div className="flex justify-end">
              <div className="join ">
                <button onClick={() => setPage(1)} className="join-item btn">
                  1
                </button>
                <button onClick={() => setPage(2)} className="join-item btn ">
                  2
                </button>
                <button onClick={() => setPage(3)} className="join-item btn">
                  3
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Products;
