import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

import {
  getAllEmployees,
  addEmployee,
  DeleteEmployee,
  ReactiveEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../services/EmployeeServices";
import { toast } from "react-toastify";

const Employee = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [currEmployee, setCurrEmployee] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State thông báo lỗi
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReactiveModal, setShowReactiveModal] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [updateID, setUpdateID] = useState(null);
  const [reactiveID, setReactiveID] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    employeeID: "",
    identityCard: "",
    lname: "",
    fname: "",
    phoneNumber: "",
    dob: "",
    hireDate: "",
    email: "",
    supervisorID: undefined,
    superviseDate: undefined,
    storeID: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const result = await getAllEmployees();

      setEmployeeList(result.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  const handleAddEmployee = async () => {
    const {
      employeeID,
      identityCard,
      fname,
      lname,
      phoneNumber,
      dob,
      hireDate,
      email,
      supervisorID,
      superviseDate,
      storeID,
    } = newEmployee;

    if (!employeeID) {
      setErrorMessage(
        "Employee ID is required and must be exactly 7 characters."
      );
      return;
    }
    if (!identityCard) {
      setErrorMessage(
        "Identity Card is required and must be exactly 12 digits."
      );
      return;
    }
    if (!fname) {
      setErrorMessage("First Name is required.");
      return;
    }
    if (!lname) {
      setErrorMessage("Last Name is required.");
      return;
    }
    if (!phoneNumber) {
      setErrorMessage("Phone Number is required and must be 10 digits.");
      return;
    }
    if (!dob) {
      setErrorMessage("Date of Birth is required.");
      return;
    }
    if (!hireDate) {
      setErrorMessage("Hire Date is required.");
      return;
    }
    if (!email) {
      setErrorMessage("Email is required.");
      return;
    }
    if (!storeID) {
      setErrorMessage("Store ID is required.");
      return;
    }

    // Logic to add employee goes here
    // console.log("New Employee Added:", newEmployee);
    const res = await addEmployee(newEmployee);

    setNewEmployee({
      employeeID: "",
      identityCard: "",
      lname: "",
      fname: "",
      phoneNumber: "",
      dob: "",
      hireDate: "",
      email: "",
      supervisorID: undefined,
      superviseDate: undefined,
      storeID: "",
    });
    fetchEmployees();
    setShowModal(false);
    toast.success(res.data);
    setErrorMessage("");
  };

  const handleDelete = async (deleteID) => {
    const result = await DeleteEmployee(deleteID);
    // console.log(result);
    setDeleteID(null);
    setShowDeleteModal(false);
    fetchEmployees();
    toast.success(result.data);
  };

  const handleReactive = async (reactiveID) => {
    const result = await ReactiveEmployee(reactiveID);
    // console.log(result);
    setReactiveID(null);
    setShowReactiveModal(false);
    fetchEmployees();
    toast.success(result.data);
  };

  const handleChooseUpdate = async (id) => {
    const result = await getEmployeeById(id);
    // console.log(result);
    setUpdateID(id);
    setCurrEmployee(result.data);
    setShowUpdateModal(true);
  };

  const handleUpdateEmployee = async () => {
    const result = await updateEmployee(currEmployee, updateID);

    setUpdateID(null);
    setCurrEmployee(null);
    fetchEmployees();
    setShowUpdateModal(false);
    toast.success(result.data);
  };

  return (
    <section className="p-8">
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-3xl">EMPLOYEE LISTS</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => setShowModal(true)}
        >
          Add Employee
        </button>
      </div>
      <hr className="my-5" />

      {/* list */}
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-5">
                S.N
              </th>
              <th scope="col" className="px-6 py-5">
                EmployeeID
              </th>
              <th scope="col" className="px-6 py-5">
                IdentityCard
              </th>
              <th scope="col" className="px-6 py-5">
                Fname
              </th>
              <th scope="col" className="px-6 py-5">
                Lname
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                DOB
              </th>
              <th scope="col" className="px-6 py-3">
                HireDate
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                SupervisorID
              </th>
              <th scope="col" className="px-6 py-3">
                SuperviseDate
              </th>
              <th scope="col" className="px-6 py-3">
                StoreID
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employeeList.length > 0 ? (
              employeeList.map((user, index) => (
                <tr
                  key={user.employeeID}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 capitalize">{user.employeeID}</td>
                  <td className="px-6 py-4">{user.identityCard}</td>
                  <td className="px-6 py-4 capitalize">{user.fname}</td>
                  <td className="px-6 py-4 capitalize">{user.lname}</td>
                  <td className="px-6 py-4">{user.phoneNumber}</td>
                  <td className="px-6 py-4">{user.dob}</td>
                  <td className="px-6 py-4">{user.hireDate}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.supervisorID}</td>
                  <td className="px-6 py-4">{user.superviseDate}</td>
                  <td className="px-6 py-4">{user.store?.storeID}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          handleChooseUpdate(user.employeeID);
                        }}
                        className="font-medium text-green-500"
                      >
                        <FaEdit size={20} />
                      </button>
                      {user.isDeleted ? (
                        <button
                          className="font-medium text-indigo-500"
                          onClick={() => {
                            setReactiveID(user.employeeID); // Cập nhật deleteID
                            setShowReactiveModal(true); // Hiển thị modal xóa
                          }}
                        >
                          <TiTick size={25} />
                        </button>
                      ) : (
                        <button
                          className="font-medium text-red-500"
                          onClick={() => {
                            setDeleteID(user.employeeID); // Cập nhật deleteID
                            setShowDeleteModal(true); // Hiển thị modal xóa
                          }}
                        >
                          <FaTrash size={20} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-1/3 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-medium mb-4">Add New Employee</h3>
            {/* Form */}
            <div className="grid gap-4">
              <div>
                <label className="block font-medium mb-1">Employee ID</label>
                <input
                  type="text"
                  placeholder="Enter Employee ID"
                  value={newEmployee.employeeID}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      employeeID: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Identity Card</label>
                <input
                  type="text"
                  placeholder="Enter Identity Card"
                  value={newEmployee.identityCard}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      identityCard: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  value={newEmployee.fname}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, fname: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  value={newEmployee.lname}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, lname: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  value={newEmployee.phoneNumber}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={newEmployee.dob}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, dob: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Hire Date</label>
                <input
                  type="date"
                  value={newEmployee.hireDate}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, hireDate: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={newEmployee.email}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, email: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Supervisor ID</label>
                <input
                  type="text"
                  placeholder="Enter Supervisor ID"
                  value={newEmployee.supervisorID}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      supervisorID: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Supervise Date</label>
                <input
                  type="date"
                  value={newEmployee.superviseDate}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      superviseDate: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Store ID</label>
                <input
                  type="text"
                  placeholder="Enter Store ID"
                  value={newEmployee.storeID}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, storeID: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
            </div>
            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 mt-4">{errorMessage}</p>
            )}
            <div className="mt-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleAddEmployee}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal update employee*/}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-1/3 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-medium mb-4">Update Employee</h3>
            {/* Form */}
            <div className="grid gap-4">
              <div>
                <label className="block font-medium mb-1">Employee ID</label>
                <input
                  type="text"
                  placeholder="Enter Employee ID"
                  value={currEmployee.employeeID}
                  onChange={(e) =>
                    setCurrEmployee({
                      ...currEmployee,
                      employeeID: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Identity Card</label>
                <input
                  type="text"
                  placeholder="Enter Identity Card"
                  value={currEmployee.identityCard}
                  onChange={(e) =>
                    setCurrEmployee({
                      ...currEmployee,
                      identityCard: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  value={currEmployee.fname}
                  onChange={(e) =>
                    setCurrEmployee({ ...currEmployee, fname: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  value={currEmployee.lname}
                  onChange={(e) =>
                    setCurrEmployee({ ...currEmployee, lname: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  value={currEmployee.phoneNumber}
                  onChange={(e) =>
                    setCurrEmployee({
                      ...currEmployee,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={currEmployee.dob}
                  onChange={(e) =>
                    setCurrEmployee({ ...currEmployee, dob: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Hire Date</label>
                <input
                  type="date"
                  value={currEmployee.hireDate}
                  onChange={(e) =>
                    setCurrEmployee({
                      ...currEmployee,
                      hireDate: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={currEmployee.email}
                  onChange={(e) =>
                    setCurrEmployee({ ...currEmployee, email: e.target.value })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Supervisor ID</label>
                <input
                  type="text"
                  placeholder="Enter Supervisor ID"
                  value={currEmployee.supervisorID}
                  onChange={(e) =>
                    setCurrEmployee({
                      ...currEmployee,
                      supervisorID: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Supervise Date</label>
                <input
                  type="date"
                  value={currEmployee.superviseDate}
                  onChange={(e) =>
                    setCurrEmployee({
                      ...currEmployee,
                      superviseDate: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Store ID</label>
                <input
                  type="text"
                  placeholder="Enter Store ID"
                  value={currEmployee.store.storeID}
                  onChange={(e) =>
                    setCurrEmployee({
                      ...currEmployee,
                      storeID: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
              </div>
            </div>
            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 mt-4">{errorMessage}</p>
            )}
            <div className="mt-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => {
                  setShowUpdateModal(false);
                  setCurrEmployee(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleUpdateEmployee}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] text-center">
            <h3 className="text-xl font-medium mb-4">Delete Employee</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this employee?
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

      {showReactiveModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] text-center">
            <h3 className="text-xl font-medium mb-4">Active Employee</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to active this employee?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => {
                  setShowReactiveModal(false);
                  setReactiveID(null); // Đặt lại deleteID
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => {
                  // Handle delete logic here
                  handleReactive(reactiveID);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Employee;
