import React, { useState } from "react";
import { TrendingUp, TrendingDown, Package, ShoppingCart, DollarSign, Calendar, Filter, Download, Eye, BarChart3 } from "lucide-react";

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7days");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample data untuk analytics penjualan
  const salesMetrics = [
    {
      title: "Total Penjualan",
      value: "Rp 145,230,000",
      change: "+15.3%",
      changeType: "positive",
      icon: DollarSign,
      color: "bg-green-500",
      description: "dari bulan lalu",
    },
    {
      title: "Total Produk Terjual",
      value: "2,543",
      change: "+8.7%",
      changeType: "positive",
      icon: Package,
      color: "bg-blue-500",
      description: "unit terjual",
    },
    {
      title: "Total Transaksi",
      value: "1,847",
      change: "+12.1%",
      changeType: "positive",
      icon: ShoppingCart,
      color: "bg-purple-500",
      description: "transaksi berhasil",
    },
    {
      title: "Rata-rata Nilai Order",
      value: "Rp 78,650",
      change: "-2.3%",
      changeType: "negative",
      icon: BarChart3,
      color: "bg-orange-500",
      description: "per transaksi",
    },
  ];

  const topProducts = [
    {
      id: 1,
      name: "Smartphone Samsung Galaxy A54",
      category: "Elektronik",
      sold: 245,
      revenue: "Rp 122,500,000",
      growth: "+18%",
      image: "/api/placeholder/60/60",
    },
    {
      id: 2,
      name: "Sepatu Nike Air Max",
      category: "Fashion",
      sold: 189,
      revenue: "Rp 37,800,000",
      growth: "+12%",
      image: "/api/placeholder/60/60",
    },
    {
      id: 3,
      name: "Laptop ASUS ROG",
      category: "Elektronik",
      sold: 87,
      revenue: "Rp 174,000,000",
      growth: "+25%",
      image: "/api/placeholder/60/60",
    },
    {
      id: 4,
      name: "Tas Ransel Eiger",
      category: "Fashion",
      sold: 156,
      revenue: "Rp 15,600,000",
      growth: "+5%",
      image: "/api/placeholder/60/60",
    },
    {
      id: 5,
      name: "Kamera Canon EOS",
      category: "Elektronik",
      sold: 43,
      revenue: "Rp 86,000,000",
      growth: "+30%",
      image: "/api/placeholder/60/60",
    },
  ];

  const salesByCategory = [
    { name: "Elektronik", value: 65, revenue: "Rp 85M", color: "bg-blue-500" },
    { name: "Fashion", value: 25, revenue: "Rp 32M", color: "bg-purple-500" },
    { name: "Home & Living", value: 10, revenue: "Rp 13M", color: "bg-green-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Analytics Penjualan</h1>
            <p className="text-gray-600 mt-1">Analisis mendalam tentang performa penjualan produk Anda</p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            {/* Period Filter */}
            <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option value="7days">7 Hari Terakhir</option>
              <option value="30days">30 Hari Terakhir</option>
              <option value="3months">3 Bulan Terakhir</option>
              <option value="1year">1 Tahun Terakhir</option>
            </select>

            {/* Category Filter */}
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option value="all">Semua Kategori</option>
              <option value="elektronik">Elektronik</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home & Living</option>
            </select>

            {/* Export Button */}
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2">
              <Download size={18} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sales Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {salesMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full ${metric.color}`}>
                  <IconComponent size={24} className="text-white" />
                </div>
                <div className={`flex items-center text-sm font-medium ${metric.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                  {metric.changeType === "positive" ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                  {metric.change}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <p className="text-sm text-gray-500 mt-1">{metric.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Trend Penjualan</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-indigo-100 text-indigo-600 rounded-md">Harian</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Mingguan</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Bulanan</button>
            </div>
          </div>
          <div className="h-80 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 size={48} className="text-indigo-400 mx-auto mb-3" />
              <p className="text-gray-500">Grafik trend penjualan akan ditampilkan di sini</p>
              <p className="text-sm text-gray-400 mt-1">Integrasikan dengan library chart.js atau recharts</p>
            </div>
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Penjualan per Kategori</h3>
          <div className="space-y-4">
            {salesByCategory.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                  <span className="text-sm text-gray-500">{category.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`h-2 rounded-full ${category.color}`} style={{ width: `${category.value}%` }}></div>
                </div>
                <p className="text-xs text-gray-500">{category.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Produk Terlaris</h3>
          <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700">
            <Eye size={16} />
            <span className="text-sm">Lihat Semua</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Produk</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Kategori</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Terjual</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Growth</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium text-gray-800">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">{product.category}</span>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-800">{product.sold} unit</td>
                  <td className="py-4 px-4 font-medium text-gray-800">{product.revenue}</td>
                  <td className="py-4 px-4">
                    <span className="flex items-center text-green-600 text-sm font-medium">
                      <TrendingUp size={14} className="mr-1" />
                      {product.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Performance */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Performa Penjualan</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-blue-800">Target Bulanan</p>
                <p className="text-2xl font-bold text-blue-900">Rp 200M</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-600">72.6% tercapai</p>
                <div className="w-32 bg-blue-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "72.6%" }}></div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-800">Produk Terlaris</p>
                <p className="text-lg font-bold text-green-900">Smartphone</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600">245 unit terjual</p>
                <p className="text-xs text-green-500">+18% dari bulan lalu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaksi Terbaru</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((order, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">#{order}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Order #{20240500 + order}</p>
                    <p className="text-xs text-gray-500">{5 - index} menit yang lalu</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">Rp {(Math.random() * 1000000 + 100000).toLocaleString("id-ID")}</p>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Selesai</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
