import axios from "axios";

const sourceURL = "http://localhost:8080";

export const getBlogDataRequest = (sort) => {
  return axios.get(sourceURL + "/blog-data", {
    params: {sort}
  });
}

export const getCategoriesRequest = () => {
  return axios.get(sourceURL + "/categories");
}

export const addCategoryRequest = categoryName => {
  return axios.post(sourceURL + "/category/" + categoryName);
}

export const removeCategoryRequest = categoryId => {
  return axios.delete(sourceURL + "/category/" + categoryId);
}

export const editPostTitleRequest = (postId, title) => {
  return axios.patch(sourceURL + "/post/" + postId + "/title", {title});
}

export const editPostContentRequest = (postId, content) => {
  return axios.patch(sourceURL + "/post/" + postId + "/content", {content});
}

export const removePostRequest = postId => {
  return axios.delete(sourceURL + "/post/" + postId);
}

export const addPostRequest = (postData) => {
  return axios.post(sourceURL + "/post", postData);
}