import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"


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
        <div>
            <input type="checkbox" id={checkbox_id} onChange={handleQuarterCheckboxChange}></input>
            <label htmlFor={checkbox_id} className="ml-2">Q{params.quarter} {params.year}</label>
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
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Success: ', responseData);
            } else {
                console.log(response);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="flex items-center justify-evenly h-[calc(100vh-96px)] w-full">
            <div className="border p-8 border-black rounded">
                <form className="flex flex-col" id="company-information">
                    <div className="underline">Entity Information</div>
                    <label htmlFor="taxpayer-name">Entity Name</label>
                    <input type="text" className="pl-1" id="taxpayer-name"></input>
                    <label htmlFor="ein1 ein2">EIN</label>
                    <div className="flex">
                        <input type="text" id="ein1" className="w-8 pl-1"></input>
                        <div className="ml-4 mr-4">-</div>
                        <input type="text" id="ein2" className="w-24 pl-1"></input>
                    </div>
                    <label htmlFor="address">Address</label>
                    <input type="text" className="pl-1" id="address"></input>
                    <label htmlFor="city">City</label>
                    <input type="text" className="pl-1" id="city"></input>
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <label htmlFor="state">State</label>
                            <input type="text" className="pl-1 w-16" id="state"></input>
                        </div>
                        <div className="flex flex-col ml-8">
                            <label htmlFor="zip">Zip</label>
                            <input type="text" className="pl-1 w-24" id="zip"></input>
                        </div>
                    </div>
                    <div className="underline">Signer Information</div>
                    <label htmlFor="signer-name">Name</label>
                    <input id="signer-name" type="text" className="pl-1"></input>
                    <label htmlFor="signer-title">Title</label>
                    <input id="signer-title" type="text" className="pl-1"></input>
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" type="text" className="pl-1"></input>
                </form>
            </div>
            <div className="flex flex-col items-center">
                <div className="border p-8 border-black rounded min-w-80 max-h-96 overflow-y-scroll">
                    <form id="forms-to-generate">
                        <div className="flex flex-row">
                            <input id="8821" type="checkbox"></input>
                            <label htmlFor="8821" className="ml-2">8821</label>
                            <input id="2848" type="checkbox" className="ml-4"></input>
                            <label htmlFor="2848" className="ml-2">2848</label>
                        </div>
                        <input id="941x" type="checkbox" onChange={handle941xCheckboxChange}></input>
                        <label htmlFor="941x" className="ml-2">941X</label>
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
                <div className="mt-16">
                    <button onClick={handleFormSubmit} className="border border-black hover:border-veraleo-blue-primary rounded-full p-8 hover:bg-veraleo-blue-primary cursor-pointer ease-out hover:ease-in transition duration-100 hover:text-veraleo-text-white">
                        <FontAwesomeIcon icon={faArrowRight} className="fa-solid fa-arrow-right text-6xl"/>
                    </button>
                </div>
            </div>
        </div>
    )
}