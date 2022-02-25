const getUserInfoRequest = (instance, includes) => {
  const includedFields = includes?.length
    ? includes
        .map(
          (item, i, arr) =>
            `include=${item}${
              arr.length > 1 && i !== arr.length - 1 ? "&" : ""
            }`
        )
        .join("")
    : "";

  return instance.get(`/user?${includedFields}`);
};

const getFeaturedMoviesRequest = (instance) => {
  return instance.get("/featured");
};

const addMovieToTheList = (instance, list, movieID) =>
  instance.put(`/user/list/${list}?movie=${movieID}`);

const removeMovieFromTheList = (instance, list, movieID) =>
  instance.delete(`/user/list/${list}?movie=${movieID}`);

const getMovieList = (instance, list, query) => {
  const { pageParam = 1 } = query || {};
  return instance.get(`/user/list/${list}/?page=${pageParam}`);
};

const getMoviesByGenre = (instance, query, optionalQuery) => {
  const { pageParam = 1 } = query || {};
  const { genre } = optionalQuery || {};
  console.log(`/discover?genres=${genre}&page=${pageParam}`,'PATH');
  return instance.get(`/discover?genres=${genre}&page=${pageParam}`);
};

export default api = {
  getUserInfoRequest,
  getFeaturedMoviesRequest,
  addMovieToTheList,
  removeMovieFromTheList,
  getMovieList,
  getMoviesByGenre,
};
