import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import NotAuthorized from "@/components/not-authorized";
import Loading from "@/components/loading";

function ProtectiveClaims() {
    const { status } = useSession();
    const [loading, setLoading] = useState(false);
    const [downloadURL, setDownloadURL] = useState("");
    const [entityName, setEntityName] = useState("");

    // if (status !== "authenticated") {
    //     return <NotAuthorized />
    // }

    if (loading) {
        return <Loading />
    }

    if (downloadURL) {
        return (
            <div className="flex w-full h-[calc(100vh-90px)] justify-center items-center">
                <div className="w-auto h-auto flex flex-col items-center justify-center border border-[#1793CA] rounded-md">
                    <div className="mt-16 ml-4 mr-4 w-2/3 text-wrap text-center">Click below to download TBD Protective Refund Claim</div>
                    <div className="mt-8 ml-4 mr-4">{entityName}</div>
                    <a href={downloadURL} className="mt-16 ml-4 mr-4 mb-8 flex items-center justify-center">
                        <button className="text-wrap w-3/4 flex flex-col items-center justify-center">
                            <div>
                                Download Protective Refund Claim
                            </div>
                            <div>
                                {entityName}
                            </div>
                        </button>
                    </a>
                </div>
            </div>
        )
    }

    const sendGenerateRequest = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const plainObject = Object.fromEntries(formData.entries());
        setEntityName(formData.get("entity_name")!.toString());
        const jsonString = JSON.stringify(plainObject);
        setLoading(true);
        const response = await fetch('https://mkppta0bg7.execute-api.us-east-2.amazonaws.com/prod/generate-protective-claim', {
            method: 'POST',
            body: jsonString,
        });
        setLoading(false);

        if (response.ok) {
            const result = await response.json();
            setDownloadURL(result.download_url);
        } else {
            console.error('API call failed', response.statusText);
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-[calc(100vh-90px)] text-xl">

            </div>
        </>
    )
}

export default ProtectiveClaims;