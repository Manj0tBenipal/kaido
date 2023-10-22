import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Nav from "./Layouts/Nav";
const Home = lazy(() => import("./pages/Home"));
const Genre = lazy(() => import("./pages/Genre"));

const GenreSidebar = lazy(() => import("./Layouts/GenreSidebar"));

const AnimeInfoRandom = lazy(() =>
  import("./components/AnimeInfo/AnimeInfoRandom")
);
const AnimeByFilter = lazy(() => import("./pages/AnimeByFilter"));
const AnimeByType = lazy(() => import("./pages/AnimeByType"));
const WatchAnime = lazy(() => import("./pages/WatchAnime/WatchAnime"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const RecommendedTopTen = lazy(() => import("./Layouts/RecommendedTopTen"));
const AnimeInfoJikan = lazy(() =>
  import("./components/AnimeInfo/AnimeInfoJikan")
);
const AnimeInfoKitsu = lazy(() =>
  import("./components/AnimeInfo/AnimeInfoKitsu")
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<Home />} />
          <Route path="details" element={<RecommendedTopTen />}>
            <Route path="kitsu/:id" element={<AnimeInfoKitsu />} />
            <Route path="jikan/:id" element={<AnimeInfoJikan />} />
            <Route path="random" element={<AnimeInfoRandom />} />
          </Route>
          <Route path="grid" element={<GenreSidebar />}>
            <Route path="genre" element={<Genre />} />
            <Route path="filter" element={<AnimeByFilter />} />
            <Route path="type" element={<AnimeByType />} />
          </Route>
          <Route path="search" element={<SearchResults />} />
          <Route path="watch" element={<WatchAnime />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
