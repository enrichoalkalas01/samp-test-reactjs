import { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";

interface DragAndDropImagesMiniProps {
    images?: any | null;
    setImages?: (e: any) => void;
    destroyCallback?: () => void;
    className?: string;
    disabled?: boolean;
    destroyImage?: boolean;
}

const DragAndDropImagesMini: React.FC<DragAndDropImagesMiniProps> = ({
    images = null,
    setImages = () => {},
    destroyCallback = () => {},
    className = "",
    disabled = false,
    destroyImage = false,
}) => {
    const [image, setImage] = useState<string | null>(images || null);
    const [imageRealFile, setImageRealFile] = useState<any | null>(images);
    useEffect(() => {
        console.log(images ? true : false)
        if ( images ) setImage(images)
    }, [images])
    
    const handleDrop = (event: any) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0];

        // Only allow image files to be uploaded
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage(reader.result as string);
                setImageRealFile(file);
            };
        }
    };

    const handleBrowse = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        // Only allow image files to be uploaded
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage(reader.result as string);
                setImageRealFile(file);
            };
        }
    };

    const handleClear = () => {
        setImage(null);
        setImageRealFile(null);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        setImages(imageRealFile);
    }, [imageRealFile, setImages]);
    
    return (
        <>
            <div
                className={`max-w-[100px] max-h-[100px] h-[100px] w-[100px] border-2 border-gray-300 border-dashed rounded-md relative ${className}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <label className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        {image ? (
                            <div className="image-preview h-full">
                                <img
                                    src={image}
                                    alt="Uploaded image"
                                    className="w-[100%] h-[100%] object-contain"
                                />
                            </div>
                        ) : (
                            <div>
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                </div>
                                <input
                                    id="dropzone-file"
                                    className="hidden"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleBrowse}
                                    disabled={disabled}
                                />
                            </div>
                        )}
                    </label>
                </div>
                {image && !disabled && (
                    <button className="btn btn-primary absolute -top-[10px] -right-[10px]" onClick={handleClear}>
                        <IoMdCloseCircle className="w-[25px] h-[25px]" />
                    </button>
                )}
                {destroyImage && (
                    <button className="btn btn-primary absolute -top-[10px] -right-[10px]" onClick={destroyCallback}>
                        <FaTrashAlt className="w-[25px] h-[25px] text-red-700" />
                    </button>
                )}
            </div>
        </>
    );
};

export default DragAndDropImagesMini;
