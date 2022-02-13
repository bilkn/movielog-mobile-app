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

export default api = {
  getUserInfoRequest,
  getFeaturedMoviesRequest,
  addMovieToTheList,
  removeMovieFromTheList
};
