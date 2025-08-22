import { getAllCategories } from '@/lib/firebase/blogs/blogCategories'
import React, { useEffect, useState } from 'react'
import { useBlogForm } from '../contexts/BlogFormContext';

function SelectCategoryField() {
    const {
        data,
        handleData,
    } = useBlogForm();

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [categories, setCategories] = useState(null)

    async function fetchCategories() {
        setLoading(true)
        try {
            const res = await getAllCategories()
            setCategories(res)
        } catch (error) {
            setError(error)
            console.log(error)
        }
        setLoading(false)
    }
    useEffect(() => {
        fetchCategories()
    }, [])

    return <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-700 font-semibold">Category<span className="text-red-500">*</span> </label>
        <select
            className="px-4 py-2 rounded-sm border bg-gray-50"
            name="category"
            id="category"
            value={data?.categoryId}
            onChange={(e) => {
                handleData('categoryId', e.target.value)
            }}
            required>
            <option value="">Select Category</option>
            {categories && categories?.map((item) => {
                return <option value={item?.id} key={item.id}>{item?.name}</option>
            })}
        </select>
    </div>
}

export default SelectCategoryField
