import styles from "./CountriesList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CiteisContext";
/* eslint-disable react/prop-types */
function CountriesList() {
  const { cities, isLoading } = useCities();
  // return the spinner if the data is still loading
  if (isLoading) return <Spinner />;
  // If there are no visited city display a message
  if (!cities.length) return <Message message="Add your first city" />;
  // extract the unique countries from the cities prop
  const countries = cities.reduce((array, city) => {
    if (!array.map((el) => el.country).includes(city.country)) {
      return [...array, { country: city.country, emoji: city.emoji }];
    } else return array;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={cities.id} />
      ))}
    </ul>
  );
}

export default CountriesList;
