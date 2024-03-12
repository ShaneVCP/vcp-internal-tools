import { signIn, useSession } from "next-auth/react";

export default function Welcome() {
    const { data: session, status } = useSession();

    const getSignInButton = () => {
        if (status !== "authenticated") {
            return (
                <button onClick={() => signIn()} className='border p-4 shadow border-black mt-8 rounded hover:bg-veraleo-blue-primary hover:text-white ease-out hover:ease-in transition duration-100'>Sign in</button>
            )
        } else {
            return <div>Signed in as {session.user?.name}</div>
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-[calc(100vh-98px)]">
                <div className="text-4xl">VerAleo Capital Partners</div>
                <div className="text-2xl">Internal Tools</div>
                {
                    status !== "authenticated" ?
                    (<>
                        {getSignInButton()}
                    </>
                        ) :
                    <a href="erc-form-generator" className="border p-4 shadow border-black mt-8 rounded hover:bg-veraleo-blue-primary hover:text-white ease-out hover:ease-in transition duration-100">ERC Form Generator</a>
                }
                {/* {getSignInButton()} */}
            </div>
        </>
        )
}