import '../styles/globals.css';
import { signIn, useSession } from "next-auth/react";

export default function Welcome() {
    const { data: session, status } = useSession();

    const getSignInButton = () => {
        if (status !== "authenticated") {
            return (
                <button onClick={() => signIn()} className='p-3rounded-md cursor-pointer text-lg mt-8'>Sign in</button>
            )
        } else {
            return <div>Signed in as {session.user?.name}</div>
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-[calc(100vh-90px)]">
                <div className="text-xl">VerAleo Capital Partners</div>
                <div className="text-lg">Internal Tools</div>
                {getSignInButton()}
            </div>
        </>
        )
}