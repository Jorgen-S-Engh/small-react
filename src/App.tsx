import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

type VenueData = {
  id: string;
  name: string;
  title: string;
  description: string;
  price: number;
};

function App(): JSX.Element {
  const [venues, setVenues] = useState<VenueData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   fetch("https://dummyjson.com/products")
  //     .then((res) => res.json())
  //     .then(console.log);
  // }, []);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://v2.api.noroff.dev/holidaze/venues");
        if (!res.ok) {
          throw new Error("failed to load data");
        }

        const json = await res.json();
        setVenues(json.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  if (loading) return <h1>Loading....</h1>;

  const filteredVenues = venues.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div>
        <h1>Hello</h1>
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
        />
        {filteredVenues.map((venue) => (
          <div key={venue.id}>
            <h3>{venue.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
