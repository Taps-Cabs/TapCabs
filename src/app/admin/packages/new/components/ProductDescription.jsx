import { usePackageForm } from "../context/PackageContext";

export default function ProductDescription() {
    const { data, handleData } = usePackageForm();

    return (
        <div className='flex items-center gap-2'>
            <input
                type="checkbox"
                checked={data?.includeToll || false}
                onChange={(e) => handleData("includeToll", e.target.checked)}
            />
            <label className="text-base font-bold text-gray-600">
                Include Toll Tax
            </label>
        </div>
    );
}
