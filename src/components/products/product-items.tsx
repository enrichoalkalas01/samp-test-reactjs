import { ImBarcode } from "react-icons/im";

interface PropsItems {
    title?: string,
    sku?: string,
    price?: string,
    image?: string,
}

export default function ProductItems({ title, sku, price }: PropsItems) {
    return(
        <>
            <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                    <div className="truncate text-sm font-medium text-indigo-600">{title}</div>
                        <div className="ml-2 flex flex-shrink-0">
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{price}</span>
                        </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                        <div className="sm:flex">
                            <div className="mr-6 flex items-center text-sm text-gray-500">
                                <ImBarcode
                                    className="mr-2"
                                />
                                {sku}
                            </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                    </div>
                </div>
            </div>
        </>
    )
}