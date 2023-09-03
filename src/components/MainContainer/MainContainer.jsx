import AnimeCollection from "./AnimeCollection";
import LoadingSpinner from "../LoadingSpinner";

import {
  useHandleJikanResponse,
  useTopMovies,
  useTopONAs,
  useTopOVAs,
  useTopSpecials,

} from "../../hooks/useJikan";

import MainSidebar from "./MainSidebar";

export default function MainContainer() {
  let isLoading = true;
  const ova = useTopOVAs();
  const ona = useTopONAs();
  const movies = useTopMovies();
  const specials = useTopSpecials();

  if (
    !(
      ova.isLoading &&
      ona.isLoading &&
      specials.isLoading &&
      movies.isLoading
    )
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
