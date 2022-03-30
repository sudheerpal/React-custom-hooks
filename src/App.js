import { useEffect, useState } from "react";
import { useFetch, useDebounce } from "./hooks";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading, error } = useFetch(
    "https://countriesnow.space/api/v0.1/countries/flag/images"
  );
  const [filteredData, setFilteredData] = useState([]);
  const debouncedValue = useDebounce(searchTerm, 500);

  // update filteredData whenever there is any search term
  useEffect(() => {
    if (debouncedValue) {
      console.log("data:", data);
      let newData = data.filter((item) =>
        item.name.toLowerCase().includes(debouncedValue.toLowerCase())
      );
      console.log(debouncedValue, newData);
      setFilteredData(newData);
    }
  }, [debouncedValue]);

  const getFIlteredData = () => {
    return debouncedValue ? filteredData : data;
  };

  const inputHandler = (e) => {
    let value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <>
      {/* search input  */}
      <div className="seachBar">
        <input
          type="text"
          onChange={inputHandler}
          placeholder="Search a Country"
        />
      </div>

      {/* flag list  */}
      <div className="flagList">
        {loading && <div>Loading...</div>}
        {error && <div>Something went wrong</div>}
        {getFIlteredData().map((item) => {
          return (
            <div className="cardItem" key={item.iso3}>
              <img className="itemFlag" src={item.flag} alt={item.name} />
              <h4>{item.name}</h4>
            </div>
          );
        })}
        {getFIlteredData().length === 0 && <div>No Result found</div>}
      </div>
    </>
  );
}
