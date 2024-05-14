import HubSpotService from "@/services/hubspot.service";
import { useEffect, useState } from "react";
import Select from "react-select";
import Loading from "./loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function HubSpotModal({ closeHubSpotModal, setSelectedHubSpotInfo } : { closeHubSpotModal: () => void, setSelectedHubSpotInfo: (company: any) => void }) {
    const [selectedOption, setSelectedOption] = useState(null as any);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFillCompanyInfo = () => {
        if (selectedOption) {
          setSelectedHubSpotInfo(selectedOption.value);
        }
      };

    useEffect(() => {
        const fetchData = async () => {
          const hsService = new HubSpotService();
          const data = await hsService.searchCompaniesPaginated();
          console.log(data);
          return data;
        };

        fetchData()
          .then((vals: any) => {
            const hsResults = vals;
            
            const toDisplay = hsResults.map((result: any) => ({
              label: result.properties.name,
              value: {
                'address': result.properties.address,
                'ein': result.properties.ein,
                'state': result.properties.state,
                'zip': result.properties.zip,
                'name': result.properties.name,
                'city': result.properties.city
              }
            }));
            
            setDropdownOptions(toDisplay);
            setIsLoading(false);
          })
          .catch((error: any) => {
            console.error('Error fetching data:', error);
            setIsLoading(false);
          });
      }, []);

    return (
            <div className="w-full h-[calc(100vh_-_6rem_-2px)] flex justify-center items-center">
                {isLoading ? <Loading /> : (
                <div className="relative border border-black p-8 rounded w-1/4">
                    <button className="absolute top-2 right-2" onClick={closeHubSpotModal}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                    <Select 
                        className="mt-2"
                        isSearchable
                        options={dropdownOptions}
                        onChange={setSelectedOption}
                    />
                    {selectedOption ? 
                        (
                            <div className="flex w-full justify-center">
                                <button className="mt-4 p-1 border rounded border-black hover:border-veraleo-blue-primary hover:bg-veraleo-blue-primary cursor-pointer ease-out hover:ease-in transition duration-100 hover:text-veraleo-text-white" onClick={handleFillCompanyInfo}>Fill Company Info</button>
                            </div>
                        ) :
                        (
                            <div />
                        )}
                </div>
            
                )}
            </div>
    )
}