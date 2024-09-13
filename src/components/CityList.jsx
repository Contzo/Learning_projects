import styles from "./CityList.module.css";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message="Add your first city" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
// Define prop types for CityList
CityList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.object).isRequired, // Array of objects
  isLoading: PropTypes.bool.isRequired, // Boolean
};
export default CityList;
