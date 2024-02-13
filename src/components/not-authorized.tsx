import { signIn } from "next-auth/react"

const NotAuthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-90px)]">
            <div className="text-xl">Not authorized</div>
            <div className="text-lg">Please sign in</div>
            <button onClick={() => signIn()} className='p-3rounded-md cursor-pointer text-lg mt-8'>Sign in</button>
        </div>
    )
}

export default NotAuthorized;