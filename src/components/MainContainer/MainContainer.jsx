import AnimeCollection from "./AnimeCollection";
import LoadingSpinner from "../LoadingSpinner";

import {
  getTopMovies,
  getTopOVAs,
  getTopSpecials,
} from "../../api/jikan";

import MainSidebar from "./MainSidebar";

export default function MainContainer() {
  let isLoading = true;
  const ova = getTopOVAs();
  // const ona = getTopONAs();
  const movies = getTopMovies();
  const specials = getTopSpecials();

  if (!(ova.isLoading && specials.isLoading && movies.isLoading)) {
    isLoading = false;
  }

  return (
    <div className="main-container d-flex">
      <div className="sidebar-wrapper">
        <MainSidebar />
      </div>
      <div className="collections-wrapper d-flex-fd-column a-center ">
        <AnimeCollection
          collectionName="Top Movies"
          data={movies}
          isLoading={isLoading}
        />
        <AnimeCollection
          collectionName="Specials"
          data={specials}
          isLoading={isLoading}
        />
        <AnimeCollection
          collectionName="Top OVA's"
          data={ova}
          isLoading={isLoading}
        />
        {/* <AnimeCollection collectionName="Top ONA's" data={ona} /> */}
      </div>
    </div>
  );
}
