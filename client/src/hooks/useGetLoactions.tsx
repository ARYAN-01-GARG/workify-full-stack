// import axios from "axios";
import { useMemo} from "react";

export default function useGetLocations() {
    // const [locations, setLocations] = useState<string[]>([
    //     "Loading locations..."
    // ]);

    // Temporary locations for testing purposes
    // Indian states can be added here if needed
    const tempLocations = useMemo(() => [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal"
    ], []);
    // useEffect(() => {
    //     // const fetchLocations = async () => {
    //     //     try {
    //     //         const res = await axios.get("https://api.countrystatecity.in/v1/countries/IN/states", {
    //     //             headers: {
    //     //                 "X-CSCAPI-KEY": "YOUR_API_KEY"
    //     //             }
    //     //         });
    //     //         setLocations(res.data.map((state: { name: string }) => state.name));
    //     //     } catch (error) {
    //     //         console.error("Error fetching locations:", error);
    //     //         setLocations(tempLocations);
    //     //     }
    //     // };
    //     fetchLocations();
    // }, [tempLocations]);
  return tempLocations;
}
