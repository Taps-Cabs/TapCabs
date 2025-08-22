export default function CategoryCard({ category }) {
    return (
        <div className="flex w-fit items-center bg-purple-100 text-purple-700 text-xs font-medium rounded-full px-2 py-1">
            <img
                src={category?.imageURL?.imageURL}
                alt={category?.name}
                className="h-4 w-4 rounded-full mr-1 object-cover"
            />
            <span>{category?.name}</span>
        </div>
    );
}
