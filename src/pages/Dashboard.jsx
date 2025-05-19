import { BarChart3, TrendingUp, Users, ShoppingCart } from "lucide-react";

const stats = [
  {
    title: "Total Customers",
    value: "2,543",
    icon: Users,
    trend: "+12%",
    trendUp: true,
    color: "bg-blue-500",
  },
  {
    title: "Total Orders",
    value: "1,823",
    icon: ShoppingCart,
    trend: "+8%",
    trendUp: true,
    color: "bg-green-500",
  },
  {
    title: "Revenue",
    value: "Rp 45,230,000",
    icon: TrendingUp,
    trend: "+15%",
    trendUp: true,
    color: "bg-primary",
  },
  {
    title: "Analytics",
    value: "98.2%",
    icon: BarChart3,
    trend: "-2%",
    trendUp: false,
    color: "bg-orange-500",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${stat.trendUp ? "text-green-600" : "text-red-600"}`}>{stat.trend}</span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">#{i}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Order #{1000 + i}</p>
                    <p className="text-sm text-gray-500">Customer {i}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">Rp {(Math.random() * 500000 + 100000).toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Just now</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h2>
          <div className="space-y-4">
            {["Chicken & Ribs Combo", "Fried Chicken Dinner", "Surf & Turf Gift Basket", "Special Combo"].map((product, i) => (
              <div key={product} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  <span className="font-medium text-gray-900">{product}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${90 - i * 15}%` }}></div>
                  </div>
                  <span className="text-sm text-gray-500">{90 - i * 15}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
