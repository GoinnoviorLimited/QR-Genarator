'use client'
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Client component since we're using hooks
export default function Products() {
    const [products, setProducts] = useState([]);
    console.log(products);
    const [formData, setFormData] = useState({
        productName: "",
        price: "",
        category: "",
        description: ""
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.productName.trim()) {
            newErrors.productName = "Product name is required";
        }

        if (!formData.price.trim()) {
            newErrors.price = "Price is required";
        } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
            newErrors.price = "Price must be a valid number greater than 0";
        }

        if (!formData.category.trim()) {
            newErrors.category = "Category is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (validateForm()) {
            // Simulate API call
            setTimeout(() => {
                setProducts(prev => [...prev, { ...formData, id: Date.now() }]);
                setFormData({
                    productName: "",
                    price: "",
                    category: "",
                    description: ""
                });
                setIsSubmitting(false);
            }, 500);
        } else {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Product Management</h1>
                    <p className="text-slate-300 mt-2">Add and manage your products</p>
                </div>

                <div className="grid grid-cols-1 space-y-6">
                    {/* Product Form */}
                    <div className="lg:col-span-1 rounded-xl shadow-md p-6 h-fit bg-white/5 backdrop-blur-md border border-white/30">
                        <h2 className="text-xl font-semibold mb-6">Add New Product</h2>

                        <form onSubmit={handleSubmit} >
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-white mb-1">
                                        Product Name *
                                    </label>
                                    <Input
                                        name="productName"
                                        value={formData.productName}
                                        onChange={handleChange}
                                        className={errors.productName ? "border-red-500" : ""}
                                        placeholder="Enter product name"
                                    />
                                    {errors.productName && (
                                        <p className="text-red-500 text-xs mt-1">{errors.productName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-1">
                                        Price ($) *
                                    </label>
                                    <Input
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className={errors.price ? "border-red-500" : ""}
                                        placeholder="0.00"
                                    />
                                    {errors.price && (
                                        <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-1">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.category ? "border-red-500" : "border-slate-300"
                                            }`}
                                    >
                                        <option value="">Select a category</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="clothing">Clothing</option>
                                        <option value="books">Books</option>
                                        <option value="home">Home & Kitchen</option>
                                    </select>
                                    {errors.category && (
                                        <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Product description"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-5"
                                >
                                    {isSubmitting ? "Adding Product..." : "Add Product"}
                                </Button>
                            </div>

                        </form>
                    </div>

                    {/* Product List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-semibold text-slate-800 mb-6">Product List</h2>

                            {products.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-slate-400 mb-4">
                                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16"></path>
                                        </svg>
                                    </div>
                                    <p className="text-slate-500">No products added yet</p>
                                    <p className="text-slate-400 text-sm mt-1">Add your first product using the form</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-slate-200">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Product</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            {products.map((product) => (
                                                <tr key={product.id}>
                                                    <td className="px-4 py-3">
                                                        <div className="font-medium text-slate-800">{product.productName}</div>
                                                        {product.description && (
                                                            <div className="text-sm text-slate-500 mt-1">{product.description}</div>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full capitalize">
                                                            {product.category}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 font-medium text-slate-800">${product.price}</td>
                                                    <td className="px-4 py-3">
                                                        <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                                                        <button
                                                            className="text-red-600 hover:text-red-800"
                                                            onClick={() => setProducts(products.filter(p => p.id !== product.id))}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}