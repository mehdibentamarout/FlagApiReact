import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";
const Countries = () => {
  const [data, setData] = useState([]);
  const [sorteData, setSortedData] = useState([]);
  const [playOnce, setPlayOnce] = useState(true);
  const [rangeValue, setRangeValue] = useState(40);
  const [selectRadio, setSelectedRadio] = useState("");
  const radio = ["Africa", "America", "Asia", "Europe", "Oceania"];
  useEffect(() => {
    if (playOnce) {
      axios
        .get(
          "https://restcountries.com/v2/all?fields=name,population,region,capital,flag"
        )
        .then((res) => {
          setData(res.data);
          setPlayOnce(false);
        });
    }

    const sortedCountry = () => {
      const countryObj = Object.keys(data).map((i) => data[i]);
      const sortedArray = countryObj.sort((a, b) => {
        return b.population - a.population;
      });
      sortedArray.length = rangeValue;
      setSortedData(sortedArray);
    };
    sortedCountry();
  }, [data, rangeValue, playOnce]);

  return (
    <div className="countries">
      <div className="sort-container">
        <input
          type="range"
          min="1"
          max="250"
          value={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />
        <ul>
          {radio.map((radio) => {
            return (
              <li key={radio}>
                <input
                  type="radio"
                  value={radio}
                  id={radio}
                  checked={radio === selectRadio}
                  onChange={(e) => setSelectedRadio(e.target.value)}
                />
                <label htmlFor={radio}>{radio}</label>
              </li>
            );
          })}
        </ul>
      </div>
      <ul className="countries-list">
        {sorteData
          .filter((country) => country.region.includes(selectRadio))
          .map((country) => (
            <Cards country={country} key={country.name} />
          ))}
      </ul>
    </div>
  );
};

export default Countries;
