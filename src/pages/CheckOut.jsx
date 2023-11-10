import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
function CheckOut() {
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("tableData"))
      ? JSON.parse(localStorage.getItem("tableData"))
      : []
  );
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const handleAddToBag = () => {
    toast.success("Order placed successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const date = `${currentMinutes.toString()}:${currentHour.toString()} ${currentDay.toString()}.${currentMonth.toString()}.${currentYear.toString()}`;
    console.log(date);
    const newOrder = {
      name: firstName,
      address: address,
      product: "Blue",
      cost: "$199.99",
      date: date,
    };
    setOrders([...orders, newOrder]);
    localStorage.setItem("tableData", JSON.stringify([...orders, newOrder]));
  };
  const localStorageSetData = (orders) => {
    console.log(orders);
  };

  return (
    <div>
      <div className="w-full border-b border-black mb-10">
        <h1 className="text-3xl font-bold mb-5">Pleace Your Order</h1>
      </div>
      <div className="grid-cols-1  grid gap-7 md:grid-cols-2 mb-10">
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-3">Shipping Information</h1>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text text-lg">First Name</span>
            </label>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full "
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="label">
              <span className="label-text text-lg">Address</span>
            </label>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full  mb-10"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div>
              <button
                onClick={() => {
                  handleAddToBag();
                  localStorageSetData();
                }}
                className="btn w-full btn-accent btn-outline"
              >
                PLEACE YOUR ORDER
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
        <div>
          <div className="bg-sky-300 rounded-xl w-full mb-5">
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
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
