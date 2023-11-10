import { useSelector } from "react-redux";
import { removeCart } from "../redux/features/shoppingSlice";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
function Cart() {
  const { addData, amount, totalPrice } = useSelector(
    (state) => state.globalState
  );

  const dispatch = useDispatch();
  const handleAddToBag = () => {
    toast.error("Item deleted to card!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <div>
      <div className="w-full border-b border-black mb-10">
        <h1 className="text-3xl font-bold mb-5">Shopping Cart</h1>
      </div>
      {addData.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-10">
          {addData && (
            <ul className="flex w-full flex-col sm:flex-col mr-auto ">
              {addData.map((data) => {
                return (
                  <li className="flex flex-col sm:flex-row justify-between gap-5 border-b pb-5 mb-10 w-full">
                    <div>
                      <img
                        src={data.attributes.image}
                        className="w-[150px] h-[150px] mb-5 sm:mb-0 mr-[40px] object-cover rounded-xl"
                      />
                    </div>
                    <div className="mr-[60px] w-[140px]">
                      <h1 className="text-lg font-bold">
                        {data.attributes.title.toUpperCase()}
                      </h1>
                      <p className="font-bold text-sm mb-5 sm:mb-0">
                        {data.attributes.company}
                      </p>
                    </div>
                    <div className="flex mr-auto flex-col items-center gap-3">
                      <label className="font-bold" tmlFor="amount" h>
                        Amount
                      </label>
                      <p>{amount}</p>
                      <div>
                        <button
                          onClick={() => {
                            dispatch(removeCart(data));
                            handleAddToBag();
                          }}
                          className="text-sky-500 hover:underline mb-5 sm:mb-0"
                        >
                          remove
                          <ToastContainer />
                        </button>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-lg font-bold">
                        ${" "}
                        {parseFloat(
                          data.attributes.price.toString().slice(0, -2) +
                            "." +
                            data.attributes.price.toString().slice(-2)
                        )}
                      </h1>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <div>
            <div className="bg-sky-300 rounded-xl w-full lg:w-[300px] mb-5">
              <ul className="p-6 text-black font-semibold">
                <li className="flex w-full border-b border-black">
                  <p className="mr-auto">Subtotal</p>
                  <p className="mb-1">$179.99</p>
                </li>
                <li className="flex w-full border-b border-black">
                  <p className="mr-auto">Shipping </p>
                  <p className="mb-1">$5.00</p>
                </li>
                <li className="flex w-full border-b border-black">
                  <p className="mr-auto">Tax</p>
                  <p className="mb-1">$39.00</p>
                </li>
              </ul>
              <div className="flex text-black font-bold p-6">
                <p className="mr-auto">Order total</p>
                <p>$433.98</p>
              </div>
            </div>
            <Link to="/checkout" className="btn btn-accent btn-outline w-full">
              PROCED TO CHECK OUT
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
