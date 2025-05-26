import { useEffect, useState } from "react";

export default function useCountryCurrency() {
  const [country, setCountry] = useState(null);
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    fetch("https://ipinfo.io/json?token=f70773aa0ad126")
      .then((res) => res.json())
      .then((data) => {
        if (data.country === "IN") {
          setCurrency("INR");
        } else {
          setCurrency("USD");
        }
      })
      .catch((err) => console.error("Location fetch failed:", err));
  }, []);

  return { country, currency };
}
