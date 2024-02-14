import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import NotAuthorized from "@/components/not-authorized";
import Loading from "@/components/loading";

function ProtectiveClaims() {
    const { status } = useSession();
    const [loading, setLoading] = useState(false);
    const [downloadURL, setDownloadURL] = useState("");
    const [entityName, setEntityName] = useState("");

    if (status !== "authenticated") {
        return <NotAuthorized />
    }

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
                <div className="bg-[#FEFEFE] border-2 border-blue-300 w-auto h-auto rounded-md flex flex-col justify-top">
                    <div className="mt-4 self-center">Protective Claims Generator</div>
                    <form onSubmit={sendGenerateRequest}>
                        <div className="flex flex-col items-start mt-2 ml-4 mr-4 w-[calc(100vw - 1rem)]">
                            <div className="border-b-2 border-blue-300 pb-0">Entity Information</div>
                            <div className="flex flex-row mt-4 w-full justify-between">
                                <div>Entity name</div>
                                <input type="text" name="entity_name" className=" ml-8 text-center"></input>
                            </div>
                            <div className="flex flex-row mt-4 w-full justify-between">
                                <div>Address</div>
                                <input type="address" name="address" className=" ml-8 text-center"></input>
                            </div>
                            <div className="flex flex-row mt-4 w-full justify-between">
                                <div className="flex flex-row w-full">
                                    <div>City</div>
                                    <input type="text" name="city" className="ml-4 w-36 text-center"></input>
                                </div>
                                <div className="flex flex-row mr-12">
                                    <div>State</div>
                                    <input type="text" name="state" className="ml-4 w-12 text-center"></input>
                                </div>
                            </div>
                            <div className="flex flex-row mt-4 w-full justify-between">
                                <div className="flex flex-row">
                                    <div>Zip code</div>
                                    <input type="text" name="zip_code" className="ml-2 w-24 text-center"></input>
                                </div>
                                <div className="flex flex-row ml-4">
                                    <div>EIN</div>
                                    <input type="text" name="ein1" className="ml-2 w-12 text-center"></input>
                                    <div className="ml-2">-</div>
                                    <input type="text" name="ein2" className="ml-2 w-24 text-center"></input>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start mt-4 ml-4 mr-4 w-[calc(100vw - 1rem)]">
                            <div className="border-b-2 border-blue-300 pb-0">Authorized signatory</div>
                            <div className="flex flex-row mt-4 w-full justify-between">
                                <div>Name</div>
                                <input type="text" name="authorized_signatory_name" className="ml-8 text-center"></input>
                            </div>
                            <div className="flex flex-row mt-4 w-full justify-between">
                                <div>Title</div>
                                <input type="text" name="authorized_signatory_title" className="ml-8 text-center"></input>
                            </div>
                        </div>
                        <div className="flex flex-row justify-start items-baseline ml-4 mt-4">
                            <div>Amend to Zero</div>
                            <input type="checkbox" name="zero" className="ml-4 w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded  focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        </div>
                            <div className="mt-8 mb-4 w-full flex justify-center">
                                <button type="submit" className="p-4" disabled={false}>Generate Protective Claim</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProtectiveClaims;