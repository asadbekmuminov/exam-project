import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function ThreeProductList() {
  const {
    data: products,
    isPending,
    error,
  } = useFetch(
    "https://strapi-store-server.onrender.com/api/products?featured=true"
  );

  return (
    <div>
      {!isPending ? (
        <div>
          <div className="flex justify-between gap-3 mb-16">
            <div className="max-w-lg">
              <h1 className="text-4xl sm:text-6xl font-black mb-12">
                We are changing the way people shop
              </h1>
              <p className="text-xl mb-10">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Tempore repellat explicabo enim soluta temporibus asperiores aut
                obcaecati perferendis porro nobis.
              </p>
              <Link to="/product" className="btn btn-accent btn-outline">
                OUR PRODUCTS
              </Link>
            </div>
            <div className=" hidden md:inline  max-w-md">
              <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box ">
                {products &&
                  products.data.map((product) => {
                    return (
                      <div key={product.id} className="carousel-item">
                        <img
                          src={product.attributes.image}
                          className="rounded-box max-h-[400px]"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="w-full border-b mb-8">
            <h1 className="text-3xl mb-5 font-bold">Featured Products</h1>
          </div>

          <ul className="grid lg:grid-cols-3 sm:grid-cols-2 mb-10">
            {products &&
              products.data.map((product) => {
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
                          className="rounded-xl object-cover max-h-[200px] w-full  mx-auto"
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
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default ThreeProductList;
