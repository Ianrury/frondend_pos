import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Plus, Minus, Trash2, Edit2 } from "lucide-react";
import { useCustomerStore } from "../store";

const levelColors = {
  Warga: "bg-orange-100 text-orange-800",
  Juragan: "bg-blue-100 text-blue-800",
  Sultan: "bg-green-100 text-green-800",
};

export default function CustomerDetail() {
  const { id } = useParams();
  const { getCustomerById, updateCustomerOrder, deleteCustomerOrder } = useCustomerStore();
  const customer = getCustomerById(id);

  if (!customer) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Not Found</h2>
          <p className="text-gray-600 mb-4">The customer you're looking for doesn't exist.</p>
          <Link to="/customer" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Customers
          </Link>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleQuantityChange = (orderId, newQuantity) => {
    if (newQuantity < 1) {
      if (confirm("Remove this item from the order?")) {
        deleteCustomerOrder(customer.id, orderId);
      }
    } else {
      updateCustomerOrder(customer.id, orderId, newQuantity);
    }
  };

  const totalOrderValue = customer.orders.reduce((sum, order) => sum + order.price * order.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/customer" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customer Detail</h1>
            <p className="text-gray-600">Detailed information about {customer.name}</p>
          </div>
        </div>
        <Link to={`/customer/${customer.id}/edit`} className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
          <Edit2 className="w-4 h-4 mr-2" />
          Edit Customer
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">{customer.name}</h3>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${levelColors[customer.level]} mt-2`}>{customer.level}</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{customer.name.toLowerCase().replace(" ", ".")}@email.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>+62 812 3456 7890</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Jakarta, Indonesia</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{customer.orders.length}</p>
                    <p className="text-sm text-gray-600">Total Orders</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(customer.totalTransaction)}</p>
                    <p className="text-sm text-gray-600">Total Spent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Favorite Menu</span>
                <span className="font-medium text-gray-900">{customer.favoriteMenu}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Customer Since</span>
                <span className="font-medium text-gray-900">Jan 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Order</span>
                <span className="font-medium text-gray-900">2 days ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Order History</h2>
              <p className="text-sm text-gray-600">All products ordered by this customer</p>
            </div>

            <div className="p-6">
              {customer.orders.length > 0 ? (
                <div className="space-y-4">
                  {customer.orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{order.productName}</h4>
                          <p className="text-sm text-gray-600">Price per item: {formatCurrency(order.price)}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <button onClick={() => handleQuantityChange(order.id, order.quantity - 1)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="font-medium text-gray-900 min-w-8 text-center">{order.quantity}</span>
                            <button onClick={() => handleQuantityChange(order.id, order.quantity + 1)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>

                          <div className="text-right min-w-24">
                            <p className="font-bold text-gray-900">{formatCurrency(order.price * order.quantity)}</p>
                          </div>

                          <button
                            onClick={() => {
                              if (confirm("Remove this item from the order?")) {
                                deleteCustomerOrder(customer.id, order.id);
                              }
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Order Summary */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total Order Value</span>
                      <span className="text-xl font-bold text-primary">{formatCurrency(totalOrderValue)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">No orders yet</div>
                  <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Order
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
