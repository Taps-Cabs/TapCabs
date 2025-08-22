import React from 'react'
import { useProductForm } from '../contexts/ProductFormContext';
import { useCategories } from '@/lib/firebase/category/read';

function ProductCategory() {
    const { data: categories } = useCategories();

    const { data, handleData } = useProductForm();

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
            </label>
            <select
                value={data?.categoryId ?? ""}
                onChange={(e) => handleData('categoryId', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all text-gray-500"
                required
            >
                <option value="" >Select Category</option>
                {categories?.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default ProductCategory
