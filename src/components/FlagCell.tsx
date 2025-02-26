import { useState } from "react";

const FlagCell = ({ lat, lng }: { lat: string; lng: string }) => {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCountryFlag = async () => {
    if (countryCode || loading) return; // Prevent multiple API calls
    setLoading(true);
    try {
      const res = await fetch(`https://geocode.xyz/${lat},${lng}?json=1`);
      const data = await res.json();
      setCountryCode(data.countryCode);
    } catch (error) {
      console.error("Error fetching geo data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onMouseEnter={fetchCountryFlag}
      style={{ width: "30px", height: "20px", margin: "0 auto" }}
    >
      {countryCode ? (
        <img
          src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
          alt={countryCode}
          style={{ width: "20px", height: "15px" }}
        />
      ) : loading ? (
        <span>Loading...</span>
      ) : (
        <span>🌍</span>
      )}
    </div>
  );
};

export default FlagCell;
