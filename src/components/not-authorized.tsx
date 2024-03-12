import { signIn } from "next-auth/react"

const NotAuthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-90px)]">
            <div className="text-4xl">Not authorized</div>
            <div className="text-2xl">Please sign in</div>
            <button onClick={() => signIn()} className='border p-4 shadow border-black mt-8 rounded hover:bg-veraleo-blue-primary hover:text-white ease-out hover:ease-in transition duration-100'>Sign in</button>
        </div>
    )
}

export default NotAuthorized;