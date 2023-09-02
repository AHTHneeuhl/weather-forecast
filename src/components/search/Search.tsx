import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchCities, City } from "api/OpenWeatherService";

interface SearchProps {
  onSearchChange: (enteredData: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const loadOptions = async (inputValue: string) => {
    const citiesList = await fetchCities(inputValue);

    return {
      options: citiesList.data.map((city: City) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      })),
    };
  };

  const onChangeHandler = (enteredData: string | null) => {
    setSearchValue(enteredData);
    if (enteredData !== null) {
      onSearchChange(enteredData);
    }
  };

  return (
    <AsyncPaginate
      placeholder="Search for cities"
      debounceTimeout={600}
      value={searchValue}
      onChange={onChangeHandler}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
