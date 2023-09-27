import AnimeCollection from "./AnimeCollection";
import LoadingSpinner from "../LoadingSpinner";

import {
  getTopMovies,
  getTopONAs,
  getTopOVAs,
  getTopSpecials,
} from "../../api/jikan";

import MainSidebar from "./MainSidebar";

export default function MainContainer() {
  let isLoading = true;
  const ova = getTopOVAs();
  const ona = getTopONAs();
  const movies = getTopMovies();
  const specials = getTopSpecials();

  if (
    !(ova.isLoading && ona.isLoading && specials.isLoading && movies.isLoading)
  ) {
    isLoading = false;
  }

  return (
    <div className="main-container d-flex">
      {!isLoading ? (
        <>
          <div className="sidebar-wrapper">
            <MainSidebar />
          </div>
          <div className="collections-wrapper d-flex-fd-column a-center ">
            <AnimeCollection collectionName="Top Movies" data={movies} />
            <AnimeCollection collectionName="Specials" data={specials} />
            <AnimeCollection collectionName="Top OVA's" data={ova} />
            {/* <AnimeCollection collectionName="Top ONA's" data={ona} /> */}
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
