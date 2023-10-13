import { useRef } from "react";
import { useKey } from "../../customHooks/index";

export function Search({ query, setQuery }) {
  const searchInput = useRef(null);

  function handleEnterKey() {
    if (document.activeElement !== searchInput.current) {
      setQuery('');
      searchInput.current.focus();
    }
  }

  useKey('Enter', handleEnterKey);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchInput} />
  );
}
