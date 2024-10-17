import { useEffect, useState } from "react"
import axios from "axios"
import Swal from 'sweetalert2'
import UniversalCookie from "universal-cookie"
import { useHeaderStore } from "../../zustand/headerStore"

const cookies = new UniversalCookie(null, { path: '/' })

export default function Page() {
    const { base_url_api } = useHeaderStore()
    const [Username, setUsername] = useState<string | null>(null)
    const [Password, setPassword] = useState<string | null>(null)

    useEffect(() => {

    }, [Username, Password])

    const handleForm = async (e: any) => {
        e.preventDefault()

        try {
            let DataPassing = {
                username: Username,
                password: Password,
            }

            let config = {
                url: `${ base_url_api }/login`,
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(DataPassing)
            }
            
            let response = await axios(config)
            cookies.set("__act", response.data.data.access_token.token, {
                maxAge: response.data.data.access_token.expired.formatted,
                secure: true,
            })

            cookies.set("__rft", response.data.data.refresh_token.token, {
                maxAge: response.data.data.refresh_token.expired.formatted,
                secure: true,
            })

            Swal.fire({
                title: 'Success',
                text: response?.data?.message,
                icon: 'success',
                confirmButtonText: 'Close'
            })

            setTimeout(() => {
                window.location.href = "/dashboard"
            }, 1500)
        } catch (error: any) {
            console.log(error)
            let message = error?.response?.data?.message || error?.message
            Swal.fire({
                title: 'Failed',
                text: message,
                icon: 'error',
                confirmButtonText: 'Close'
            })
        }
    }

    return (
        <>
            <div className="w-full h-[100vh]">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            alt="Your Company"
                            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                            className="mx-auto h-10 w-auto"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Login account
                        </h2>
                    </div>
                    
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleForm} className="space-y-3">

                            {/* Username */}
                            <div>
                                <label htmlFor="Username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="Username"
                                        name="Username"
                                        type="text"
                                        required
                                        onChange={(e) => setUsername(e.target.value)}
                                        autoComplete="Username"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="Password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="Password"
                                        name="Password"
                                        type="password"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="Password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex mt-6 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Submit
                                </button>
                            </div>

                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            You Dont Have Account ?{' '}
                            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Register Here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}