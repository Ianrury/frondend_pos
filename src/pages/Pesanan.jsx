import React, { useState, useMemo } from "react";
import { Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, MoreVertical, Users, TrendingUp, Calendar, Mail, Phone, MapPin } from "lucide-react";

// Sample purchase data - updated with invoice numbers
const samplePurchases = [
  {
    id: 1,
    invoiceNumber: "INV-2024-001",
    customerName: "John Doe",
    email: "john.doe@email.com",
    phone: "+62 812-3456-7890",
    address: "Jakarta, Indonesia",
    level: "Premium",
    joinDate: "2024-01-15",
    status: "Active",
    totalTransaction: 2500000,
    avatar: null,
  },
  {
    id: 2,
    invoiceNumber: "INV-2024-002",
    customerName: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+62 813-5678-9012",
    address: "Bandung, Indonesia",
    level: "Silver",
    joinDate: "2024-02-20",
    status: "Active",
    totalTransaction: 1200000,
    avatar: null,
  },
  {
    id: 3,
    invoiceNumber: "INV-2024-003",
    customerName: "Robert Johnson",
    email: "robert.j@email.com",
    phone: "+62 814-9012-3456",
    address: "Surabaya, Indonesia",
    level: "Gold",
    joinDate: "2024-01-05",
    status: "Inactive",
    totalTransaction: 3800000,
    avatar: null,
  },
  {
    id: 4,
    invoiceNumber: "INV-2024-004",
    customerName: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+62 815-2345-6789",
    address: "Yogyakarta, Indonesia",
    level: "Premium",
    joinDate: "2024-03-10",
    status: "Active",
    totalTransaction: 750000,
    avatar: null,
  },
  {
    id: 5,
    invoiceNumber: "INV-2024-005",
    customerName: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+62 816-7890-1234",
    address: "Medan, Indonesia",
    level: "Bronze",
    joinDate: "2024-04-15",
    status: "Active",
    totalTransaction: 450000,
    avatar: null,
  },
];

// Customer level colors
const levelColors = {
  Bronze: "bg-amber-100 text-amber-800",
  Silver: "bg-gray-100 text-gray-800",
  Gold: "bg-yellow-100 text-yellow-800",
  Premium: "bg-purple-100 text-purple-800",
};

// Status colors
const statusColors = {
  Active: "bg-green-100 text-green-800",
  Inactive: "bg-red-100 text-red-800",
  Pending: "bg-yellow-100 text-yellow-800",
};

export default function Pesanan() {
  const [purchases, setPurchases] = useState(samplePurchases);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortBy, setSortBy] = useState("customerName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter and search purchases
  const filteredPurchases = useMemo(() => {
    let filtered = purchases.filter((purchase) => {
      const matchesSearch =
        purchase.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || purchase.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) || purchase.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLevel = !selectedLevel || purchase.level === selectedLevel;
      const matchesStatus = !selectedStatus || purchase.status === selectedStatus;

      return matchesSearch && matchesLevel && matchesStatus;
    });

    // Sort purchases
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === "totalTransaction") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (sortBy === "joinDate") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [purchases, searchTerm, selectedLevel, selectedStatus, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredPurchases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPurchases = filteredPurchases.slice(startIndex, endIndex);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalPurchases = purchases.length;
    const activePurchases = purchases.filter((p) => p.status === "Active").length;
    const premiumPurchases = purchases.filter((p) => p.level === "Premium").length;
    const totalRevenue = purchases.reduce((sum, p) => sum + p.totalTransaction, 0);

    return {
      totalPurchases,
      activePurchases,
      premiumPurchases,
      totalRevenue,
    };
  }, [purchases]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle delete purchase
  const handleDeletePurchase = (purchaseId) => {
    if (confirm("Are you sure you want to delete this purchase?")) {
      setPurchases(purchases.filter((p) => p.id !== purchaseId));
    }
  };

  // Handle detail view
  const handleViewDetail = (purchaseId) => {
    console.log("View purchase detail:", purchaseId);
    // TODO: Navigate to purchase detail page
  };

  // Handle edit
  const handleEditPurchase = (purchaseId) => {
    console.log("Edit purchase:", purchaseId);
    // TODO: Navigate to edit purchase page
  };

  // Handle sort
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Get avatar initials
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Purchase</h1>
          <p className="text-gray-600 mt-1">Manage your Purchase</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button onClick={() => console.log("Navigate to /purchase/add")} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            Add Purchase
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by customer name or invoice number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Levels</option>
              <option value="Bronze">Bronze</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Premium">Premium</option>
            </select>

            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>

            <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
          </div>
        </div>
      </div>

      {/* Purchase Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort("invoiceNumber")}>
                  <div className="flex items-center gap-1">
                    Invoice Number
                    {sortBy === "invoiceNumber" && <span className="text-blue-600">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort("customerName")}>
                  <div className="flex items-center gap-1">
                    Customer Name
                    {sortBy === "customerName" && <span className="text-blue-600">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort("level")}>
                  <div className="flex items-center gap-1">
                    Level
                    {sortBy === "level" && <span className="text-blue-600">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort("totalTransaction")}>
                  <div className="flex items-center gap-1">
                    Total Transaction
                    {sortBy === "totalTransaction" && <span className="text-blue-600">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                  </div>
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentPurchases.map((purchase, index) => (
                <tr key={purchase.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{startIndex + index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{purchase.invoiceNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">{getInitials(purchase.customerName)}</div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{purchase.customerName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${levelColors[purchase.level]}`}>{purchase.level}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(purchase.totalTransaction)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5  hover:bg-green-50 rounded-lg transition-colors" title="View Detail" onClick={() => handleViewDetail(purchase.id)}>
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Purchase" onClick={() => handleEditPurchase(purchase.id)}>
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Purchase" onClick={() => handleDeletePurchase(purchase.id)}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(endIndex, filteredPurchases.length)}</span> of <span className="font-medium">{filteredPurchases.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === i + 1 ? "z-10 bg-blue-50 border-blue-500 text-blue-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredPurchases.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No Purchase found</h3>
            <p className="mt-1 text-sm text-gray-500">{searchTerm || selectedLevel || selectedStatus ? "Try adjusting your search criteria" : "Get started by adding your first Purchase"}</p>
            {!searchTerm && !selectedLevel && !selectedStatus && (
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Purchase
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Analytics Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Purchase Analytics Dashboard</h3>
            <p className="text-blue-100 mb-4">Get detailed insights about Purchase behavior, purchase patterns, and growth trends</p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">View Analytics</button>
          </div>
          <div className="hidden md:block">
            <div className="text-6xl opacity-20">📊</div>
          </div>
        </div>
      </div>
    </div>
  );
}
