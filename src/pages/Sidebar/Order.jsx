import { useState, useEffect } from "react";
import {
  getAllOrders,
  deleteOrder,
  addOrder,
  updateStatusOrder,
  updateOrder,
} from "../../services/OrderServices";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
const Order = () => {
  const [orderList, setOrderList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  //   const [statusOrder, setStatusOrder] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [deleteID, setDeleteID] = useState(null);

  const [newOrder, setNewOrder] = useState({
    orderID: "",
    orderDate: "",
    orderStatus: "",
    totalAmount: "",
    employee: {
      employeeID: "",
    },
    customer: {
      customerID: "",
    },
    // deliveryID: "",
  });

  const [currOrder, setCurrOrder] = useState({
    orderID: "",
    orderDate: "",
    orderStatus: "",
    totalAmount: "",
    employee: {
      employeeID: "",
    },
    customer: {
      customerID: "",
    },
    // deliveryID: "",
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const result = await getAllOrders();
      console.log(result.data);
      setOrderList(result.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleAddOrder = async () => {
    try {
      console.log(newOrder);
      const result = await addOrder(newOrder);
      setNewOrder({
        orderID: "",
        orderDate: "",
        orderStatus: "",
        totalAmount: "",
        employee: {
          employeeID: "",
        },
        customer: {
          customerID: "",
        },
        // deliveryID: "",
      });
      fetchOrders();
      setShowModal(false);
      toast.success(result.data);
    } catch (error) {
      console.error("Error adding order:", error);
      toast.error("Failed to add order.");
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteOrder(deleteID);
      setDeleteID(null);
      setShowDeleteModal(false);
      fetchOrders();
      toast.success(result.data);
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order.");
    }
  };

  const handleStatusChange = async (orderID, newStatus) => {
    try {
      const updatedOrder = { orderStatus: newStatus };
      const result = await updateStatusOrder(updatedOrder, orderID);
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders(); // Refresh the list after status change
      setIsMenuVisible(false);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status.");
    }
  };

  const handleChooseUpdate = (order) => {
    setCurrOrder(order);
    setShowUpdateModal(true);
  };

  const handleUpdateOrder = async () => {
    const result = await updateOrder(currOrder, currOrder.orderID);

    setCurrOrder(null);
    fetchOrders();
    setShowUpdateModal(false);
    toast.success(result.data);
  };
  return (
    <section className="p-8">
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-3xl">ORDER LIST</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => setShowModal(true)}
        >
          Add Order
        </button>
      </div>
      <hr className="my-5" />

      {/* Order List */}
      <div className="relative overflow-x-auto rounded-lg min-h-screen">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-5">Order ID</th>
              <th className="px-6 py-5">Customer ID</th>
              <th className="px-6 py-5">Employee ID</th>
              <th className="px-6 py-5">Order Date</th>
              <th className="px-6 py-5">Total Amount</th>
              <th className="px-6 py-5">Order Status</th>
              <th className="px-6 py-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderList.length > 0 ? (
              orderList.map((item) => (
                <tr
                  key={item.orderID}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{item.orderID}</td>

                  <td className="px-6 py-4">{item.customer.customerID}</td>
                  <td className="px-6 py-4">{item.employee.employeeID}</td>
                  <td className="px-6 py-4">{item.orderDate}</td>
                  {/* <td className="px-6 py-4">{item.orderStatus}</td> */}
                  <td className="px-6 py-4">{item.totalAmount}</td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        className="bg-gray-200 p-2 rounded-lg"
                        onClick={() => setIsMenuVisible(!isMenuVisible)} // Toggle menu visibility
                      >
                        {item.orderStatus}
                      </button>
                      {isMenuVisible && (
                        <div className="absolute top-0 right-0 mt-2 bg-white shadow-md rounded-lg">
                          <ul className="text-sm text-gray-700">
                            <li
                              className="p-2 cursor-pointer hover:bg-gray-200"
                              onClick={() =>
                                handleStatusChange(item.orderID, "Pending")
                              }
                            >
                              Pending
                            </li>
                            <li
                              className="p-2 cursor-pointer hover:bg-gray-200"
                              onClick={() =>
                                handleStatusChange(item.orderID, "Shipping")
                              }
                            >
                              Shipping
                            </li>
                            <li
                              className="p-2 cursor-pointer hover:bg-gray-200"
                              onClick={() =>
                                handleStatusChange(item.orderID, "Completed")
                              }
                            >
                              Completed
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleChooseUpdate(item)}
                        className="text-green-500"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteID(item.orderID);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-500"
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No stores found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Order Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-1/3">
            <h3 className="text-xl font-medium mb-4">Add New Order</h3>
            <div className="grid gap-4">
              <div>
                <label className="block font-medium mb-1">Order ID</label>
                <input
                  type="text"
                  value={newOrder.orderID}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, orderID: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Order Date</label>
                <input
                  type="date"
                  value={newOrder.orderDate}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, orderDate: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Order Status</label>
                <input
                  type="text"
                  value={newOrder.orderStatus}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, orderStatus: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Total Amount</label>
                <input
                  type="number"
                  value={newOrder.totalAmount}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, totalAmount: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Employee ID</label>
                <input
                  type="text"
                  value={newOrder.employee.employeeID}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      employee: {
                        ...newOrder.employee,
                        employeeID: e.target.value,
                      },
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Customer ID</label>
                <input
                  type="text"
                  value={newOrder.customer.customerID}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      customer: {
                        ...newOrder.customer,
                        customerID: e.target.value,
                      },
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              {/* <div>
                <label className="block font-medium mb-1">Delivery ID</label>
                <input
                  type="text"
                  value={newOrder.deliveryID}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, deliveryID: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div> */}
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={() => handleAddOrder()}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Store */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] text-center">
            <h3 className="text-xl font-medium mb-4">Delete Order</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this order?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteID(null); // Đặt lại deleteID
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => {
                  // Handle delete logic here
                  handleDelete(deleteID);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Store Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-1/3">
            <h3 className="text-xl font-medium mb-4">Update Order</h3>
            <div className="grid gap-4">
              <div>
                <label className="block font-medium mb-1">Order ID</label>
                <input
                  type="text"
                  value={currOrder.orderID}
                  onChange={(e) =>
                    setCurrOrder({ ...currOrder, orderID: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Order Date</label>
                <input
                  type="date"
                  value={currOrder.orderDate}
                  onChange={(e) =>
                    setCurrOrder({ ...currOrder, orderDate: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Order Status</label>
                <input
                  type="text"
                  value={currOrder.orderStatus}
                  onChange={(e) =>
                    setCurrOrder({ ...currOrder, orderStatus: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Total Amount</label>
                <input
                  type="number"
                  value={currOrder.totalAmount}
                  onChange={(e) =>
                    setCurrOrder({ ...currOrder, totalAmount: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Employee ID</label>
                <input
                  type="text"
                  value={currOrder.employee.employeeID}
                  onChange={(e) =>
                    setCurrOrder({
                      ...currOrder,
                      employee: {
                        ...currOrder.employee,
                        employeeID: e.target.value,
                      },
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Customer ID</label>
                <input
                  type="text"
                  value={currOrder.customer.customerID}
                  onChange={(e) =>
                    setCurrOrder({
                      ...currOrder,
                      customer: {
                        ...currOrder.customer,
                        customerID: e.target.value,
                      },
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              {/* <div>
                <label className="block font-medium mb-1">Delivery ID</label>
                <input
                  type="text"
                  value={currOrder.deliveryID}
                  onChange={(e) =>
                    setCurrOrder({ ...currOrder, deliveryID: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div> */}
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => {
                  setShowUpdateModal(false);
                  setCurrOrder(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={() => handleUpdateOrder()}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Order;
