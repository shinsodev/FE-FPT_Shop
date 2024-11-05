import React from "react";
import { NavLink } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import ProductImage from "../../assets/img/iphone.webp"; // Placeholder image

const ProductList = () => {
  // Static data for demonstration
  const productList = [
    {
      id: 1,
      name: "Smartphone XYZ",
      price: "500.00",
      category: "Smartphones",
      image: "",
      stock: 20,
    },
    {
      id: 2,
      name: "Laptop ABC",
      price: "1200.00",
      category: "Laptops",
      image: "",
      stock: 10,
    },
    {
      id: 3,
      name: "Tablet 123",
      price: "300.00",
      category: "Tablets",
      image: "",
      stock: 15,
    },
  ];

  return (
    <section className="p-8">
      <div>
        <h2 className="font-medium text-3xl">Product List</h2>
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
                Product Name
              </th>
              <th scope="col" className="px-6 py-5">
                Price
              </th>
              <th scope="col" className="px-6 py-5">
                Category
              </th>
              <th scope="col" className="px-6 py-5">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {productList && productList.length > 0 ? (
              productList.map((product, index) => (
                <tr
                  key={product.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 capitalize">{product.name}</td>
                  <td className="px-6 py-4">${product.price}</td>
                  <td className="px-6 py-4 capitalize">{product.category}</td>
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden">
                      <img
                        src={product.image || ProductImage}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center gap-3">
                      <NavLink
                        to={`/product/view/${product.id}`}
                        className="font-medium text-indigo-500"
                      >
                        <FaEye size={20} />
                      </NavLink>
                      <NavLink
                        to={`/product/edit/${product.id}`}
                        className="font-medium text-green-500"
                      >
                        <FaEdit size={20} />
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
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProductList;
