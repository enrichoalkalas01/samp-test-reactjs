import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Button } from 'flowbite-react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { useHeaderStore } from '../../../zustand/headerStore';
import WrapperCard from '../../../components/wrappers/wrapper-card';
import RegularInput from '../../../components/general/regular-input';
import DragAndDropImagesMini from '../../../components/general/dragn-and-drop-image-mini';

export default function ProductCreate() {
    const { token, base_url_api } = useHeaderStore()
    const { handleSubmit, control } = useForm();
    const [images, setImages] = useState<any | null>(null)
  
    const onSubmitHandler = async (data: any) => {
        try {
            const formData = new FormData()

            formData.append("title", data?.Title)
            formData.append("slug", data?.Slug)
            formData.append("description", data?.Description)
            formData.append("sku", data?.SKU)
            formData.append("price", data?.Price)
            formData.append("images", images)

            // Debug untuk melihat isi FormData
            for (let pair of formData.entries()) {
                console.log(pair);  // Menampilkan key dan nama file di FormData
            }
            
            let config = {
                url: `${base_url_api}/products`,
                method: "post",
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
                window.location.href = "/dashboard/products"
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
                        <h2>Product Create</h2>
                    </div>
                    <div className='w-full'>
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                            <div className='w-full mb-4'>
                                <RegularInput
                                    isDisabled={false}
                                    isRequired={true}
                                    control={control}
                                    name='Title'
                                    placeholder='input Title here'
                                />
                            </div>
                            <div className='w-full mb-4'>
                                <RegularInput
                                    isDisabled={false}
                                    isRequired={true}
                                    control={control}
                                    name='Slug'
                                    placeholder='input Slug here'
                                />
                            </div>
                            <div className='w-full mb-4'>
                                <RegularInput
                                    isDisabled={false}
                                    isRequired={true}
                                    control={control}
                                    name='Description'
                                    placeholder='input Description here'
                                />
                            </div>
                            <div className='w-full mb-4'>
                                <RegularInput
                                    isDisabled={false}
                                    isRequired={true}
                                    control={control}
                                    name='SKU'
                                    placeholder='input SKU here'
                                />
                            </div>
                            <div className='w-full mb-4'>
                                <RegularInput
                                    isDisabled={false}
                                    isRequired={true}
                                    control={control}
                                    name='Price'
                                    type='number'
                                    placeholder='input Price here'
                                />
                            </div>
                            <div className='w-full mb-4'>
                                <DragAndDropImagesMini
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