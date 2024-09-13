import styles from "./CountriesList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
/* eslint-disable react/prop-types */
function CountriesList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message="Add your first city" />;
  const countries = [];
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem city={country} />
      ))}
    </ul>
  );
}

export default CountriesList;
