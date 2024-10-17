import { useEffect, useState, useMemo } from "react"
import axios from "axios"
import ReactPaginate from 'react-paginate'

import { TextInput, Button } from "flowbite-react"

import ProductItems from "../../../components/products/product-items"
import { useHeaderStore } from "../../../zustand/headerStore"
import { useSearchStore } from "../../../zustand/headerStore"

interface PropsItems {
    id: number,
    title: string,
    sku: string,
    price: number,
    image: string,
}

export default function ProductPage() {
    const { token, base_url_api } = useHeaderStore()
    const { query, size, page, total } = useSearchStore()
    const { setSearch, setTotal } = useSearchStore()
    const [items, setItems] = useState<PropsItems[]>([])

    const configVerify = useMemo(() => ({
        url: `${base_url_api}/products?size=${size}&page=${page}&query=${query || ""}&usage=`,
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }), [page, query])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios(configVerify)
                let DataPassing = []
                for ( let i in response.data.data ) {
                    DataPassing.push({
                        id: response.data.data[i]?.id,
                        title: response.data.data[i]?.title,
                        sku: response.data.data[i]?.sku,
                        price: response.data.data[i]?.price,
                        image: response.data.data[i]?.image,
                    })
                }

                setTotal({ total: response.data.pagination.total_data })
                setItems(DataPassing)
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }
        fetchProducts()
    }, [configVerify])
    
    const handlePagination = (e: any) => {
        const page = Number(e?.selected) || 1
        setSearch({ query: query, page: page + 1, size: size })
    }

    return(
        <>
            <div className="bg-gray-100">
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-none">
                        <div className="w-full md:w-[300px] pb-4 pl-1 flex gap-4">
                            <TextInput
                                placeholder="search here..."
                                onChange={(e: any) => setSearch({ query: e.target.value, page: page, size: size })}
                            />
                            <Button onClick={() => window.location.href = "/dashboard/products/create"}>Create</Button>
                        </div>
                        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                            <ul role="list" className="divide-y divide-gray-200">
                                {
                                    items?.map((item, i) => {
                                        return(
                                            <li key={i}>
                                                <a href={`/dashboard/products/${item?.id}`} className="block hover:bg-gray-50">
                                                    <ProductItems
                                                        title={item?.title}
                                                        sku={item?.sku}
                                                        price={`${Intl.NumberFormat('id-ID', { style: 'currency', currency: "IDR" }).format(item?.price)}`}
                                                        image={item?.image}
                                                    />
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        
                            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                                {/* Desktop Version */}
                                <div className="w-full sm:flex sm:flex-1 sm:items-center justify-center sm:justify-between">
                                    <div className="flex justify-center sm:justify-end mb-4 sm:mb-0">
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{page}</span> to <span className="font-medium">{Math.ceil(total / size)}</span> of{' '}
                                            <span className="font-medium">{total || 0}</span> results
                                        </p>
                                    </div>
                                    <div className="flex justify-center sm:justify-end">
                                        <ReactPaginate
                                            onPageChange={handlePagination}
                                            pageCount={Math.ceil(total / size)}
                                            pageRangeDisplayed={2}
                                            disabledClassName="disable"
                                            className="flex mx-auto"
                                            breakClassName="mx-2"
                                            breakLinkClassName="mx-4"
                                            pageClassName="relative rounded-md mx-1 inline-flex items-center px-3 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                            activeClassName="bg-blue-400 text-white hover:bg-blue-400 hover:text-black"
                                            previousClassName="px-2 py-1 mx-2"
                                            nextClassName="px-2 py-1 mx-2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}