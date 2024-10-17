import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import { Button } from 'flowbite-react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { useHeaderStore } from '../../../zustand/headerStore';
import WrapperCard from '../../../components/wrappers/wrapper-card';
import RegularInput from '../../../components/general/regular-input';
import DragAndDropImagesMini from '../../../components/general/dragn-and-drop-image-mini';

export default function ProductDetail() {
    const { id } = useParams()
    const { token, base_url_api, base_url_assets } = useHeaderStore()
    const { control, handleSubmit } = useForm()
    const [images, setImages] = useState<any | null>(null)
    const [imageURL, setImageURL] = useState<string | undefined>(undefined)
    const [product, setProduct] = useState<any | null>(null)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            let config = {
                url: `${base_url_api}/products/${id}`,
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            }

            let response = await axios(config)
            if ( (response.data.data?.images !== null && response.data.data?.images !== "null" ) && response.data.data ) {
                setImageURL(base_url_assets + response.data.data?.images)
            }
            setProduct(response.data.data)
        } catch (error: any) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Success",
                text: `${ error?.response?.data?.message }`,
            });

            setTimeout(() => {
                window.location.href = "/dashboard/products"
            }, 1500)
        }
    }

    const onSubmitHandler = async (data: any) => {
        try {
            const formData = new FormData()

            formData.append("title", data?.Title || product?.title)
            formData.append("slug", data?.Slug || product?.slug)
            formData.append("description", data?.Description)
            formData.append("sku", data?.SKU)
            formData.append("price", data?.Price || product?.price)

            if ( images ) {
                formData.append("images", images)
            }

            // Debug untuk melihat isi FormData
            for (let pair of formData.entries()) {
                console.log(pair);  // Menampilkan key dan nama file di FormData
            }
            
            let config = {
                url: `${base_url_api}/products/${ product?.id }`,
                method: "put",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                },
                data: formData
            }
    
            const response = await axios(config)
            
            Swal.fire({
                icon: "success",
                title: "Success",
                text: `${ response?.data?.message }`,
            });

            setTimeout(() => {
                window.location.href = `/dashboard/products/${id}`
            }, 1500)
        } catch (error: any) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oopps...",
                text: `Request ${ error?.response?.data?.message || error?.message }`,
            });
        }
    }
    
    return(
        <>
            <section className='w-full'>
                <WrapperCard>
                    <div>
                        <h2 className='font-bold text-lg'>Product Create</h2>
                    </div>
                    <div className='w-full'>
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                            <div className='w-full mb-4'>
                                <RegularInput
                                    isDisabled={false}
                                    isEditable={true}
                                    isRequired={true}
                                    control={control}
                                    defaultValue={product?.title}
                                    name='Title'
                                    placeholder='input Title here'
                                />
                            </div>
                            <div className='w-full mb-4'>
                                <RegularInput
                                    isDisabled={false}
                                    isEditable={true}
                                    isRequired={true}
                                    control={control}
                                    defaultValue={product?.slug}
                                    name='Slug'
                                    placeholder='input Slug here'
                                />
                            </div>
                            <div className='w-full mb-4'>
                                <RegularInput
                                    isDisabled={false}
                                    isEditable={true}
                                    isRequired={false}
                                    control={control}
                                    defaultValue={product?.description}
                                    name='Description'
                                    placeholder='input Description here'
                                />
                            </div>
                            <div className='w-full mb-4'>
                                <RegularInput
                                    isDisabled={false}
                                    isEditable={true}
                                    isRequired={false}
                                    control={control}
                                    defaultValue={product?.sku}
                                    name='SKU'
                                    placeholder='input SKU here'
                                />
                            </div>
                            <div className='w-full mb-4'>
                                <RegularInput
                                    isDisabled={false}
                                    isEditable={true}
                                    isRequired={true}
                                    control={control}
                                    defaultValue={product?.price}
                                    name='Price'
                                    type='number'
                                    placeholder='input Price here'
                                />
                            </div>
                            <div className='w-full mb-4'>
                                <DragAndDropImagesMini
                                    disabled={false}
                                    images={imageURL}
                                    setImages={(e) => setImages(e)}
                                />
                            </div>
                            <div className='w-full mb-4'>
                                <Button type='submit' color="success">Save</Button>
                            </div>
                        </form>
                    </div>
                </WrapperCard>
            </section>
        </>
    )
}