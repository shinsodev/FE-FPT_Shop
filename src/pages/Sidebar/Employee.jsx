import { useState } from "react";
import { NavLink } from "react-router-dom";
import User1 from "../../assets/img/user.avif";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const Employee = () => {
  const [employeeList, setEmployeeList] = useState([
    {
      EmployeeID: "E000002",
      IdentityCard: "123456789123",
      Lname: "Nguyen",
      Fname: "Khoa",
      PhoneNumber: "0912343210",
      DOB: "2023-04-09",
      HireDate: "2024-05-09",
      Email: "khoa.nguyen@example.com",
      SupervisorID: "E000004",
      SuperviseDate: "2024-05-09",
      StoreID: "1111111",
    },
    {
      EmployeeID: "E000003",
      IdentityCard: "123456745612",
      Lname: "Nguyen",
      Fname: "Phi",
      PhoneNumber: "0912344567",
      DOB: "2002-12-09",
      HireDate: "2022-12-09",
      Email: "phi.nguyen@example.com",
      SupervisorID: null,
      SuperviseDate: null,
      StoreID: "1111111",
    },
    {
      EmployeeID: "E000004",
      IdentityCard: "321456745612",
      Lname: "Le",
      Fname: "Phi",
      PhoneNumber: "0912344156",
      DOB: "2003-11-09",
      HireDate: "2021-11-09",
      Email: "phi.le@example.com",
      SupervisorID: null,
      SuperviseDate: null,
      StoreID: "1111111",
    },
  ]);
  const [errorMessage, setErrorMessage] = useState(""); // State thông báo lỗi
  const [showModal, setShowModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    EmployeeID: "",
    IdentityCard: "",
    Lname: "",
    Fname: "",
    PhoneNumber: "",
    DOB: "",
    HireDate: "",
    Email: "",
    SupervisorID: "",
    SuperviseDate: "",
    StoreID: "",
  });

  const handleAddEmployee = () => {
    const {
      EmployeeID,
      IdentityCard,
      Fname,
      Lname,
      PhoneNumber,
      DOB,
      HireDate,
      Email,
      SupervisorID,
      SuperviseDate,
      StoreID,
    } = newEmployee;
  
    if (!EmployeeID){
      setErrorMessage("Employee ID must be exactly 7 characters.");
      return;
    }
    if(!IdentityCard){
      setErrorMessage("Employee ID already exists.");
      return;
    }
    if (!Fname) {
      setErrorMessage("First Name is required.");
      return;
    }
  
    if (!Lname) {
      setErrorMessage("Last Name is required.");
      return;
    }
      
      if(!PhoneNumber){
        setErrorMessage("Identity Card must be exactly 12 digits.");
        return;
      }
      if(!DOB){
        setErrorMessage("Identity Card must be exactly 12 digits.");
        return;
      }
      if(!HireDate){
        setErrorMessage("Identity Card must be exactly 12 digits.");
        return;
      }
      if(!StoreID) {
      setErrorMessage("All fields are required!");
      return;
    }
  
    // Logic to add employee goes here
    console.log("New Employee Added:", newEmployee);
    setShowModal(false);
    setErrorMessage("");
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
                  key={user.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 capitalize">{user.EmployeeID}</td>
                  <td className="px-6 py-4">{user.IdentityCard}</td>
                  <td className="px-6 py-4 capitalize">{user.Fname}</td>
                  <td className="px-6 py-4 capitalize">{user.Lname}</td>
                  <td className="px-6 py-4">{user.PhoneNumber}</td>
                  <td className="px-6 py-4">{user.DOB}</td>
                  <td className="px-6 py-4">{user.HireDate}</td>
                  <td className="px-6 py-4">{user.Email}</td>
                  <td className="px-6 py-4">{user.SupervisorID}</td>
                  <td className="px-6 py-4">{user. SuperviseDate}</td>
                  <td className="px-6 py-4">{user. StoreID}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center gap-3">
                      <NavLink
                        to={`/category/update/${user.id}`}
                        className="font-medium text-green-500"
                      >
                        <FaEdit size={20} />
                        <button ></button>
                      </NavLink>
                      <button className="font-medium text-red-500">
                        <FaTrash size={20} />
                      </button>
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
            value={newEmployee.EmployeeID}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, EmployeeID: e.target.value })
            }
            className="border p-2 rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Identity Card</label>
          <input
            type="text"
            placeholder="Enter Identity Card"
            value={newEmployee.IdentityCard}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, IdentityCard: e.target.value })
            }
            className="border p-2 rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">First Name</label>
          <input
            type="text"
            placeholder="Enter First Name"
            value={newEmployee.Fname}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, Fname: e.target.value })
            }
            className="border p-2 rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Enter Last Name"
            value={newEmployee.Lname}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, Lname: e.target.value })
            }
            className="border p-2 rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={newEmployee.PhoneNumber}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, PhoneNumber: e.target.value })
            }
            className="border p-2 rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            value={newEmployee.DOB}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, DOB: e.target.value })
            }
            className="border p-2 rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Hire Date</label>
          <input
            type="date"
            value={newEmployee.HireDate}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, HireDate: e.target.value })
            }
            className="border p-2 rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={newEmployee.Email}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, Email: e.target.value })
            }
            className="border p-2 rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Supervisor ID</label>
          <input
            type="text"
            placeholder="Enter Supervisor ID"
            value={newEmployee.SupervisorID}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, SupervisorID: e.target.value })
            }
            className="border p-2 rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Supervise Date</label>
          <input
            type="date"
            value={newEmployee.SuperviseDate}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, SuperviseDate: e.target.value })
            }
            className="border p-2 rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Store ID</label>
          <input
            type="text"
            placeholder="Enter Store ID"
            value={newEmployee.StoreID}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, StoreID: e.target.value })
            }
            className="border p-2 rounded-lg w-full"
          />
        </div>
      </div>
      {/* Error Message */}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
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


    </section>
  );
};

export default Employee;
