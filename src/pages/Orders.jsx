import { useSelector } from "react-redux";

function Orders() {
  const { amount } = useSelector((state) => state.globalState);
  const data = JSON.parse(localStorage.getItem("tableData"));

  return (
    <div>
      <div>
        <div className="w-full border-b border-black mb-10">
          <h1 className="text-3xl font-bold mb-5"> Your Orders</h1>
        </div>
      </div>

      {data && (
        <div className="overflow-x-auto">
          <table className=" table table-zebra hidden md:table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Product</th>
                <th>Cost</th>
                <th>Date </th>
              </tr>
            </thead>
            <tbody>
              {data.map((oneData) => {
                return (
                  <tr>
                    <td>{oneData.name}</td>
                    <td>{oneData.address}</td>
                    <td>{amount}</td>
                    <td>$199.99</td>
                    <td>{oneData.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <table className="table table-zebra  md:hidden">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Product</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {data.map((oneData) => {
                return (
                  <tr>
                    <td>{oneData.name}</td>
                    <td>{oneData.address}</td>
                    <td>{amount}</td>
                    <td>$199.99</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;
