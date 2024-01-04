import React, { useState } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const keyDownHandler = (e) => {
    const searchUrl = `https://www.google.com/search?q=${query}`;

    if (query.length !== 0 && e.keyCode === 13 && !e.metaKey)
      window.open(searchUrl, "_self");

    if (query.length !== 0 && e.key === "Enter" && e.metaKey)
      window.open(searchUrl, "_blank");
  };

  return (
    <section className={styles.searchBar}>
      <span>
        <img
          src="/icons/search-border-left.png"
          height={49.8}
          alt="pixel border"
        />
      </span>
      <div className={styles.searchBar_wrapper}>
        <div>
          <img src="/icons/search.svg" height={23} width={23} alt="" />
        </div>

        <div>
          <input
            className={styles.searchBar_input}
            type="text"
            id=""
            maxLength="2048"
            name="q"
            title="Search"
            role="combobox"
            placeholder="Search Google"
            value={query}
            onKeyDown={keyDownHandler}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
      </div>
      <span>
        <img
          src="/icons/search-border-right.png"
          height={49.8}
          alt="pixel border"
        />
      </span>
    </section>
  );
};

export default SearchBar;