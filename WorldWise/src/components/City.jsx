import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../contexts/CiteisContext";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

/* eslint-disable react/prop-types */
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // consume the context and get the current city and the fetch function
  const { currentCity, onCityMount, isLoading } = useCities();
  // get the id for the current city from the parm of the URL
  const { id } = useParams();
  const { cityName, date, notes, emoji } = currentCity;

  useEffect(() => {
    onCityMount(id);
  }, [id]); // fetch the data about the city on the component mount

  // return the spinner element if while we fetch the data
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name {id}</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>{/* <ButtonBack /> */}</div>
    </div>
  );
}

export default City;
