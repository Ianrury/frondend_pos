import React, { useState } from "react";
import { Upload, Save, X, Image as ImageIcon, AlertCircle, Check, ArrowLeft, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    foto: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
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

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          foto: "File harus berupa gambar",
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          foto: "Ukuran file maksimal 5MB",
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        foto: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);

      // Clear error
      if (errors.foto) {
        setErrors((prev) => ({
          ...prev,
          foto: "",
        }));
      }
    }
  };

  // Remove uploaded image
  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      foto: null,
    }));
    setPreviewImage(null);
    // Reset file input
    const fileInput = document.getElementById("foto");
    if (fileInput) fileInput.value = "";
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama produk wajib diisi";
    }

    if (!formData.price) {
      newErrors.price = "Harga wajib diisi";
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Harga harus berupa angka positif";
    }

    if (!formData.stock) {
      newErrors.stock = "Stok wajib diisi";
    } else if (isNaN(formData.stock) || parseInt(formData.stock) < 0) {
      newErrors.stock = "Stok harus berupa angka positif atau nol";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("price", formData.price);
      submitData.append("stock", formData.stock);
      if (formData.foto) {
        submitData.append("foto", formData.foto);
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success
      console.log("Product data to submit:", {
        name: formData.name,
        price: formData.price,
        stock: formData.stock,
        foto: formData.foto?.name || null,
      });

      setSubmitStatus("success");

      // Reset form after success
      setTimeout(() => {
        navigate("/products");
      }, 1500);
    } catch (error) {
      console.error("Error submitting product:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format currency input
  const formatCurrency = (value) => {
    const number = value.replace(/[^\d]/g, "");
    return new Intl.NumberFormat("id-ID").format(number);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    setFormData((prev) => ({
      ...prev,
      price: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate("/products")} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Tambah Produk Baru</h1>
              <p className="text-gray-600 mt-1">Lengkapi informasi produk yang akan ditambahkan</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-indigo-600">
            <Package size={24} />
            <span className="font-medium">Manajemen Produk</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Product Info */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-800">Informasi Produk</h3>
                <p className="text-sm text-gray-600 mt-1">Data dasar produk yang akan dijual</p>
              </div>

              {/* Product Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Produk *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Masukkan nama produk..."
                />
                {errors.name && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                    <AlertCircle size={14} />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Harga (Rp) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500">Rp</span>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price ? formatCurrency(formData.price) : ""}
                    onChange={handlePriceChange}
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${errors.price ? "border-red-500" : "border-gray-300"}`}
                    placeholder="0"
                  />
                </div>
                {errors.price && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                    <AlertCircle size={14} />
                    <span>{errors.price}</span>
                  </div>
                )}
              </div>

              {/* Stock */}
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                  Stok Awal *
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="0"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${errors.stock ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Jumlah stok awal..."
                />
                {errors.stock && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                    <AlertCircle size={14} />
                    <span>{errors.stock}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-800">Foto Produk</h3>
                <p className="text-sm text-gray-600 mt-1">Upload foto produk untuk menarik perhatian pembeli</p>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Foto</label>

                {!previewImage ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
                    <input type="file" id="foto" accept="image/*" onChange={handleFileChange} className="hidden" />
                    <label htmlFor="foto" className="cursor-pointer flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <ImageIcon size={32} className="text-gray-400" />
                      </div>
                      <div>
                        <span className="text-indigo-600 font-medium hover:text-indigo-700">Klik untuk upload gambar</span>
                        <p className="text-sm text-gray-500 mt-1">atau drag & drop file di sini</p>
                      </div>
                      <p className="text-xs text-gray-400">PNG, JPG, JPEG hingga 5MB</p>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img src={previewImage} alt="Preview" className="w-full h-64 object-cover rounded-lg border border-gray-200" />
                    <button type="button" onClick={removeImage} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                      <X size={16} />
                    </button>
                    <div className="mt-3 text-sm text-gray-600">
                      <span className="font-medium">File:</span> {formData.foto?.name}
                    </div>
                  </div>
                )}

                {errors.foto && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm mt-2">
                    <AlertCircle size={14} />
                    <span>{errors.foto}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
              <button type="button" onClick={() => navigate("/products")} className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                  isSubmitting ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>Simpan Produk</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Success/Error Messages */}
      {submitStatus === "success" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Produk Berhasil Ditambahkan!</h3>
              <p className="text-gray-600">Produk akan segera tersedia di katalog</p>
            </div>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} className="text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Gagal Menambahkan Produk</h3>
              <p className="text-gray-600 mb-4">Terjadi kesalahan saat menyimpan data</p>
              <button onClick={() => setSubmitStatus(null)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
