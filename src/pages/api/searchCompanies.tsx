import axios from "axios";

const handler = async (req: any, res: any) => {
    if ((req.method) === "GET") {
        const { after } = req.query;
        const limit = 100;
        const url = `https://api.hubapi.com/crm/v3/objects/companies/search`;

        const headers = {
            Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
            "Content-Type": "application/json"
        };

        const data = {
            limit,
            after,
            properties: ["name", "ein", "address", "state", "zip", "city"],
            filterGroups: [
                {
                    filters: [
                        {
                            propertyName: "name",
                            operator: "HAS_PROPERTY"
                        },
                        {
                            propertyName: "address",
                            operator: "HAS_PROPERTY"
                        },
                        {
                            propertyName: "ein",
                            operator: "HAS_PROPERTY"
                        }
                    ]
                }
            ]
        }

        try {
            const response = await axios.post(url, data, { headers });
            res.status(200).json(response.data);
        } catch (error) {
            console.error("Error searching companies:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed"});
    }
}

export default handler;