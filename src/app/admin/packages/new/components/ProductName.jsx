import { usePackageForm } from "../context/PackageContext";

export default function ProductName() {
    const { data, handleData } = usePackageForm();

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <label>Package Name <span className="text-red-500">*</span></label>
                <input
                    type="text"
                    placeholder="e.g., Classic, Premium"
                    value={data?.name ?? ""}
                    onChange={(e) => handleData('name', e.target.value)}
                    required
                />
            </div>
            <div className='flex gap-4 flex-col sm:flex-row'>
                <div className='grow'>
                    <label>Pickup City <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        placeholder="e.g., Delhi"
                        value={data?.pickupCity ?? ""}
                        onChange={(e) => handleData('pickupCity', e.target.value)}
                        required
                    />
                </div>
                <div className='grow'>
                    <label>Drop City <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        placeholder="e.g., Noida"
                        value={data?.dropCity ?? ""}
                        onChange={(e) => handleData('dropCity', e.target.value)}
                        required
                    />
                </div>
            </div>
            <div>
                <label>Trip Type <span className="text-red-500">*</span></label>
                <select
                    value={data?.tripType ?? ""}
                    onChange={(e) => handleData("tripType", e.target.value)}
                    required
                >
                    <option value="">Select Trip Type</option>
                    <option value="One Way">One Way</option>
                    <option value="Round Trip">Round Trip</option>
                </select>
            </div>
        </div>
    );
}
