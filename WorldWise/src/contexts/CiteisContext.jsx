import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";
/* eslint-disable react/prop-types */

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    // the cities data has ben loaded
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted": {
      const updatedCites = state.cities.filter(
        (city) => city.id !== action.payload
      );
      return {
        ...state,
        isLoading: false,
        cities: updatedCites,
        currentCity: {},
      };
    }

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("No action recognized");
  }
}
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: "Can't fetch cities" });
      }
    }
    fetchCities();
  }, [dispatch]);

  const fetchCity = useCallback(
    async function (id) {
      if (currentCity.id === Number(id)) return;
      try {
        dispatch({ type: "loading" });
        const response = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await response.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        dispatch({ action: "rejected", payload: "Can't fetch the city" });
      }
    },
    [currentCity.id]
  );
  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: "Can't create new city" });
    }
  }
  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: "Can't delete city" });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        onCityMount: fetchCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context used outside of the provider");
  return context;
}

export { CitiesProvider, useCities };
