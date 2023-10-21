import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
const Home = lazyLoad("./pages/Home");
const Genre = lazyLoad("./pages/Genre");
const Nav = lazyLoad("./Layouts/Nav.jsx");
const GenreSidebar = lazyLoad("./Layouts/GenreSidebar");
const AnimeInfoRandom = lazyLoad("./components/AnimeInfo/AnimeInfoRandom");
const AnimeByFilter = lazyLoad("./pages/AnimeByFilter");
const AnimeByType = lazyLoad("./pages/AnimeByType");
const WatchAnime = lazyLoad("./pages/WatchAnime/WatchAnime");
const SearchResults = lazyLoad("./pages/SearchResults");
const RecommendedTopTen = lazyLoad("./Layouts/RecommendedTopTen");
const AnimeInfoJikan = lazyLoad("./components/AnimeInfo/AnimeInfoJikan");
const AnimeInfoKitsu = lazyLoad("./components/AnimeInfo/AnimeInfoKitsu");

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

function lazyLoad(path) {
  return lazy(() => import(/* @vite-ignore */ path));
}
