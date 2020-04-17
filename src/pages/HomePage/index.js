import React from "react";
import SearchBox from "../../components/SearchBox";

export default function HomePage() {
  return (
    <div>
      <h5>
        Search a book by it's title or check out the books in your language or
        just browse the books around you!
      </h5>
      <SearchBox />
    </div>
  );
}
