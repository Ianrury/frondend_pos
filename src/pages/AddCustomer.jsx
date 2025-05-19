import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, X } from "lucide-react";
import { useCustomerStore } from "../store";

export default function AddCustomer() {
  const navigate = useNavigate();
  const { addCustomer } = useCustomerStore();
  const [formData, setFormData] = useState({
    name: "",
    level: "Warga",
    favoriteMenu: "",
  });
  const [errors, setErrors] = useState({});

  

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Customer name is required";
    }

    if (!formData.favoriteMenu.trim()) {
      newErrors.favoriteMenu = "Favorite menu is required";
    }

    if (formData.totalTransaction < 0) {
      newErrors.totalTransaction = "Total transaction cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      addCustomer({
        ...formData,
        totalTransaction: parseFloat(formData.totalTransaction) || 0,
      });
      navigate("/customer");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/customer" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Customer</h1>
          <p className="text-gray-600">Create a new customer profile</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter customer name"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.name ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Customer Level */}
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
                Customer Level *
              </label>
              <select id="level" name="level" value={formData.level} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="Warga">Warga</option>
                <option value="Juragan">Juragan</option>
                <option value="Sultan">Sultan</option>
                <option value="Konglomerat">Konglomerat</option>
              </select>
            </div>

            {/* Favorite Menu */}
            <div>
              <label htmlFor="favoriteMenu" className="block text-sm font-medium text-gray-700 mb-2">
                Favorite Menu *
              </label>
              <input
                type="text"
                id="favoriteMenu"
                name="favoriteMenu"
                value={formData.favoriteMenu}
                onChange={handleChange}
                placeholder="Enter favorite menu"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.favoriteMenu ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.favoriteMenu && <p className="mt-1 text-sm text-red-600">{errors.favoriteMenu}</p>}
            </div>

            {/* Total Transaction */}
            {/* <div>
              <label htmlFor="totalTransaction" className="block text-sm font-medium text-gray-700 mb-2">
                Initial Total Transaction (Optional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rp</span>
                <input
                  type="number"
                  id="totalTransaction"
                  name="totalTransaction"
                  value={formData.totalTransaction}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="1000"
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.totalTransaction ? "border-red-500" : "border-gray-300"}`}
                />
              </div>
              {errors.totalTransaction && <p className="mt-1 text-sm text-red-600">{errors.totalTransaction}</p>}
              <p className="mt-1 text-sm text-gray-500">Leave as 0 if this is a new customer with no previous transactions</p>
            </div> */}

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Link to="/customer" className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Link>
              <button type="submit" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                <Save className="w-4 h-4 mr-2" />
                Save Customer
              </button>
            </div>
          </form>
        </div>

        {/* Additional Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Information</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Customer orders can be added after the customer profile is created</li>
            <li>• Customer level affects pricing and promotions</li>
            <li>• Total transaction amount will be automatically updated when orders are added</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
