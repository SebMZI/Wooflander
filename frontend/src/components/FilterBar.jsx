import React from "react";

const FilterBar = ({ setCity, setState, users }) => {
  // Pour chaque user récupérer son pays et sa ville
  // Faire un .map sur les options des selects pour afficher les pays et les villes
  // filter les users par la ville et le pays
  console.log(users);
  const userState = users.map((user) => {
    return user.state;
  });
  const userCity = users.map((user) => {
    return user.city;
  });

  const uniqueCities = users.reduce((acc, user) => {
    if (!acc.includes(user.city)) {
      acc.push(user.city);
    }
    return acc;
  }, []);

  const uniqueStates = users.reduce((acc, user) => {
    if (!acc.includes(user.state)) {
      acc.push(user.state);
    }
    return acc;
  }, []);

  console.log(userState);
  console.log(userCity);
  console.log(uniqueCities);
  console.log(uniqueStates);

  return (
    <div className="filterbar">
      <p className="filter">Filter</p>
      <div className="select-container">
        <select
          name="state"
          id=""
          onChange={(e) => setState(e.target.value)}
          className="select"
        >
          <option value="">Select State</option>
          {uniqueStates.map((state, index) => {
            return (
              <option key={index} value={state}>
                {state}
              </option>
            );
          })}
        </select>
        <select
          name="city"
          id=""
          onChange={(e) => setCity(e.target.value)}
          className="select"
        >
          <option value="">Select City</option>
          {uniqueCities.map((city, index) => {
            return (
              <option key={index} value={city}>
                {city}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
