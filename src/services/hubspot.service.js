import axios from "axios";

class HubSpotService {
  async searchCompaniesPaginated(after = null, companies = []) {
    const url = `/api/searchCompanies?after=${after}`;
    try {
      const response = await axios.get(url);
      const fetchedCompanies = response.data.results;
      companies = [...companies, ...fetchedCompanies];

      if (response.data.paging && response.data.paging.next) {
        return await this.searchCompaniesPaginated(response.data.paging.next.after, companies);
      }

      return companies;
    } catch (error) {
      console.error("Error searching companies:", error);
      throw error;
    }
  }
}

export default HubSpotService;