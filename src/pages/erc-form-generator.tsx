import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import Loading from "@/components/loading";
import { useSession } from "next-auth/react";
import NotAuthorized from "@/components/not-authorized";


const Checkbox941x = (params: { quarter: string; year: string; }) => {
    const [isQuarterChecked, setIsQuarterChecked] = useState(false);
    const checkbox_id = `q-${params.quarter}-y-${params.year}`;
    const radio_name = `941x-type-q-${params.quarter}-y-${params.year}`;
    const business_disruption_id = `q-${params.quarter}-y-${params.year}-business-disruption`;
    const gross_receipts_id = `q-${params.quarter}-y-${params.year}-gross-receipts`;
    const gross_receipts_alternate_id = `q-${params.quarter}-y-${params.year}-gross-receipts-alternate`;



    const handleQuarterCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setIsQuarterChecked(event.target.checked);
    }

    return (
        <div className="mt-1">
            <div className="flex items-center">
                <input type="checkbox" id={checkbox_id} className="w-5 h-5 shadow-md" onChange={handleQuarterCheckboxChange}></input>
                <label htmlFor={checkbox_id} className="ml-2">Q{params.quarter} {params.year}</label>
            </div>
            {isQuarterChecked && (
                <div className="flex flex-col ml-4">
                    <div className="flex flex-row">
                        <input type="radio" name={radio_name} id={business_disruption_id} defaultChecked></input>
                        <label htmlFor={business_disruption_id} className="ml-2">Business Disruption</label>
                    </div>
                    <div className="flex flex-row">
                        <input type="radio" name={radio_name} id={gross_receipts_id}></input>
                        <label htmlFor={gross_receipts_id} className="ml-2">Gross Receipts</label>
                    </div>
                    <div className="flex flex-row">
                        <input type="radio" name={radio_name} id={gross_receipts_alternate_id}></input>
                        <label htmlFor={gross_receipts_alternate_id} className="ml-2">Gross Receipts Alternate</label>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function ERCFormGenerator() {
    const [is941xChecked, setIs941xChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { status } = useSession();

    const handle941xCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setIs941xChecked(event.target.checked);
    }

    const handleFormSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    
        const formData: { companyInformation: {[key: string]: FormDataEntryValue }, formsToGenerate: {[key: string]: FormDataEntryValue }} = { companyInformation: {}, formsToGenerate: {}};
    
        const companyInformationForm = document.querySelector('#company-information')!;
        const inputs = companyInformationForm.querySelectorAll('input');
        
        inputs.forEach(input => {
            formData['companyInformation'][input.id] = input.value;
        });
    
        const formsToGenerateForm = document.querySelector('#forms-to-generate')!;
        const formsInputs = formsToGenerateForm.querySelectorAll('input');
        
        formsInputs.forEach(input => {
            formData['formsToGenerate'][input.id] = input.checked.toString();
        });
    
        sendFormGenerateRequest(formData);
    };

    const sendFormGenerateRequest = async (formData: { companyInformation: {[key: string]: FormDataEntryValue }, formsToGenerate: {[key: string]: FormDataEntryValue }}) => {
        const eligibleForms = ['2848', '8821', 'business-disruption', 'gross-receipts', 'gross-receipts-alternate']
        const requestBody: { companyInformation: {[key: string]: FormDataEntryValue }, formsToGenerate: string[] } = {companyInformation: formData.companyInformation, formsToGenerate: []}
        
        Object.keys(formData.formsToGenerate).forEach((key) => {
            let shouldAdd = false;
            if (formData.formsToGenerate[key] == "true") {
                eligibleForms.forEach((eligibleForm) => {
                    shouldAdd = !shouldAdd ? key.includes(eligibleForm) : true;
                })
                if (shouldAdd) {
                    requestBody.formsToGenerate.push(key);
                }
            }
        })
        const apiUrl = 'https://ca3qwsudy4.execute-api.us-east-2.amazonaws.com/ercFormGenerator';
        try {
            setIsLoading(true);
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify(requestBody),
            });
            setIsLoading(false);
            if (response.ok) {
                const responseData = await response.json();
                console.log('Success: ', responseData);
                window.open(responseData['download_url'], '_blank');
            } else {
                console.log(response);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    if (status !== 'authenticated') {
        return <NotAuthorized />
    } else {
        return (
            <div className="flex items-center justify-evenly h-[calc(100vh-98px)] w-full">
                <div className="border p-8 border-black rounded w-1/3 min-w-min shadow-lg">
                    <form className="flex flex-col" id="company-information">
                        <div className="underline text-2xl">Entity Information</div>
                        <label htmlFor="taxpayer-name" className="text-lg">Entity Name</label>
                        <input type="text" className="pl-1 border border-black rounded shadow-md text-lg" id="taxpayer-name"></input>
                        <label htmlFor="ein1 ein2" className="mt-1 text-lg">EIN</label>
                        <div className="flex">
                            <input type="text" maxLength={2} id="ein1" className="w-8 border border-black rounded shadow-md text-lg text-center"></input>
                            <div className="ml-2 mr-2">-</div>
                            <input type="text" maxLength={7} id="ein2" className="w-24 border border-black rounded shadow-md text-lg text-center"></input>
                        </div>
                        <label htmlFor="address" className="mt-1 text-lg">Address</label>
                        <input type="text" className="pl-1 border border-black rounded shadow-md text-lg" id="address"></input>
                        <label htmlFor="city" className="mt-1 text-lg">City</label>
                        <input type="text" className="pl-1 w-52 border border-black rounded shadow-md text-lg" id="city"></input>
                        <div className="flex flex-row justify-between w-52">
                            <div className="flex flex-col mt-1">
                                <label htmlFor="state" className="text-lg">State</label>
                                <input type="text" className="pl-1 w-16 border border-black rounded shadow-md text-lg" id="state"></input>
                            </div>
                            <div className="flex flex-col mt-1">
                                <label htmlFor="zip" className="text-lg">Zip</label>
                                <input type="text" className="pl-1 w-24 border border-black rounded shadow-md text-lg" id="zip"></input>
                            </div>
                        </div>
                        <div className="underline mt-4 text-2xl">Signer Information</div>
                        <label htmlFor="signer-name" className="mt-1 text-lg">Name</label>
                        <input id="signer-name" type="text" className="pl-1 border border-black rounded shadow-md text-lg"></input>
                        <label htmlFor="signer-title" className="mt-1 text-lg">Title</label>
                        <input id="signer-title" type="text" className="pl-1 border border-black rounded shadow-md text-lg"></input>
                        <label htmlFor="phone" className="mt-1 text-lg">Phone</label>
                        <input id="phone" type="text" className="w-52 pl-1 border border-black rounded shadow-md text-lg"></input>
                    </form>
                </div>
                <div className="flex flex-col items-center">
                    <div className="border p-8 border-black rounded min-w-80 h-[450px] overflow-y-scroll shadow-lg">
                        <form id="forms-to-generate">
                            <div className="flex flex-row items-center">
                                <input id="8821" type="checkbox" className="w-6 h-6 shadow-md"></input>
                                <label htmlFor="8821" className="ml-2 text-2xl">8821</label>
                                <input id="2848" type="checkbox" className="w-6 h-6 ml-4 shadow-md"></input>
                                <label htmlFor="2848" className="ml-2 text-2xl">2848</label>
                            </div>
                            <div className="flex items-center mt-2">

                            <input id="941x" type="checkbox" className="w-6 h-6 shadow-md" onChange={handle941xCheckboxChange}></input>
                            <label htmlFor="941x" className="ml-2 text-2xl">941X</label>
                            </div>
                            {is941xChecked && (
                                <div className="ml-4">
                                    <Checkbox941x quarter="2" year="2020" />
                                    <Checkbox941x quarter="3" year="2020" />
                                    <Checkbox941x quarter="4" year="2020" />
                                    <Checkbox941x quarter="1" year="2021" />
                                    <Checkbox941x quarter="2" year="2021" />
                                    <Checkbox941x quarter="3" year="2021" />
                                </div>
                            )}
                        </form>
                    </div>
                    {isLoading ? (<Loading />) : (
                        <div className="mt-16">
                        <button onClick={handleFormSubmit} className="border border-black hover:border-veraleo-blue-primary rounded-full p-8 hover:bg-veraleo-blue-primary cursor-pointer ease-out hover:ease-in transition duration-100 hover:text-veraleo-text-white">
                            <FontAwesomeIcon icon={faArrowRight} className="fa-solid fa-arrow-right text-6xl"/>
                        </button>
                    </div>
                    )}
                </div>
            </div>
        )
    }
}