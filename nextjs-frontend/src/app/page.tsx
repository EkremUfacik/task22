"use client";

import withAuth from "@/components/withAuth";
import { useAuthContext } from "@/context/AuthProvider";
import axios from "axios";
import { useState } from "react";

type Brewery = {
  id: number;
  name: string;
};

const Home = () => {
  const [breweries, setBreweries] = useState([]);
  const { user } = useAuthContext();

  if (!user) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    const search = target.search.value;
    const res = await axios.get(
      `http://localhost:8080/breweries?query=${search}`,
      { withCredentials: true }
    );
    setBreweries(res.data.data);
    target.search.value = "";
  };

  return (
    <div className="text-center py-8">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          id="search"
          className="border outline-none ps-3 py-2 mt-2 focus:shadow-lg"
        />
        <button className="bg-indigo-600 text-white px-6 py-2 w-28 m-auto rounded hover:bg-indigo-700 transition-all ms-5">
          Search
        </button>
      </form>

      <div className="py-6">
        <p className="font-bold text-xl underline">Breweries List</p>
        {breweries?.map((brewery: Brewery) => (
          <div key={brewery.id} className="mt-4">
            {brewery.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuth(Home);
