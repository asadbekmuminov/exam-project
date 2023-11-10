import { useFetch } from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import {
  incrementAmount,
  decrementAmount,
  addDataLocalStorage,
} from "../redux/features/shoppingSlice";

function ProductPage() {
  const { amount } = useSelector((state) => state.globalState);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data, isPending, error } = useFetch(
    `https://strapi-store-server.onrender.com/api/products/${id}`
  );

  const handleAddToBag = () => {
    toast.success("Item added to cart", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleIncrement = () => {
    dispatch(incrementAmount());
  };

  const handleDecrement = () => {
    dispatch(decrementAmount());
  };
  return (
    <div>
      {data && (
        <div>
          <div className="flex items-center gap-1 mb-6">
            <Link className="hover:underline" to="/">
              Home
            </Link>
            <AiOutlineArrowRight />
            <Link className="hover:underline" to="/product">
              Products
            </Link>
          </div>
          <div className="flex gap-20">
            <div>
              <img
                src={data.data.attributes.image}
                className="w-[550px] max-h-[400px] object-cover rounded-xl"
                alt=""
              />
            </div>
            <div className="flex flex-col items-start max-w-[500px]">
              <h1 className="text-3xl font-bold mb-3">
                {data.data.attributes.title.toUpperCase()}
              </h1>
              <p className="text-xl font-bold mb-3">
                {data.data.attributes.company}
              </p>
              <p className="text-xl mb-6 tracking-widest">
                ${" "}
                {parseFloat(
                  data.data.attributes.price.toString().slice(0, -2) +
                    "." +
                    data.data.attributes.price.toString().slice(-2)
                )}
              </p>
              <p className="mb-5">{data.data.attributes.description}</p>

              <div className="flex items-center mb-8 gap-5">
                <p className="text-xl font-semibold mb-3">Amount</p>
                <div className="flex gap-5">
                  <button
                    onClick={handleIncrement}
                    className="btn btn-accent btn-outline p-0 w-16 h-2 text-2xl"
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      if (amount > 0) {
                        handleDecrement();
                      }
                    }}
                    className="btn btn-accent btn-outline  text-2xl p-0 w-16 h-2"
                  >
                    -
                  </button>
                </div>
              </div>

              <div>
                <button
                  className="btn btn-accent btn-outline"
                  onClick={() => {
                    handleAddToBag(), dispatch(addDataLocalStorage(data.data));
                  }}
                >
                  ADD TO BAG
                </button>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
