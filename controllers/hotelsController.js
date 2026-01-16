import axios from "axios";

class HotelController {
  async getHotels(req, res) {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ message: "City is required" });
    }

    try {
      const options = {
        method: "GET",
        url: "https://travel-advisor.p.rapidapi.com/locations/search",
        params: { query: city },
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);

      const hotels =
        response.data.data
          ?.filter((item) => item.result_type === "lodging")
          .map((h) => ({
            name: h.result_object?.name,
            address: h.result_object?.address || "No address available",
            rating: h.result_object?.rating || "N/A",
            photo:
              h.result_object?.photo?.images?.large?.url ||
              "https://via.placeholder.com/400x200?text=Hotel",
               lat: h.result_object?.latitude,
               lng: h.result_object?.longitude
          })) || [];

      return res.status(200).json({ hotels });
    } catch (err) {
      console.error("Hotel API error:", err.message);
      return res.status(500).json({ message: "Failed to fetch hotels" });
    }
  }
}

export default new HotelController();
