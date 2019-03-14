import axios from "axios";
import Cookies from "js-cookie";
import { getCookieFromReq } from "../helpers/until";

const axiosInstance = axios.create({
  baseURL: `${process.env.BASE_URL}/api/v1`,
  timeout: 3000
});

const setAuthHeader = req => {
  const token = req ? getCookieFromReq(req, "jwt") : Cookies.getJSON("jwt");

  return token ? { headers: { authorization: `Bearer ${token}` } } : undefined;
};

export const getSecretData = async req => {
  return await axiosInstance
    .get(`/secret`, setAuthHeader(req))
    .then(res => res.data);
};

export const getPortfolio = async () => {
  return await axiosInstance.get(`/portfolios`).then(res => res.data);
};

const rejectPromise = resError => {
  let error = {};

  if (resError && resError.response && resError.response.data) {
    error = resError.response.data;
  } else {
    error = resError;
  }

  return Promise.reject(error);
};

export const createPortfolio = async data => {
  return await axiosInstance
    .post(`/portfolios`, data, setAuthHeader())
    .then(res => res.data)
    .catch(err => rejectPromise(err));
};

export const getPortfolioById = async (id, req) => {
  return await axiosInstance
    .get(`/portfolios/${id}`, setAuthHeader(req))
    .then(res => res.data);
};

export const updatePortfolio = async data => {
  return await axiosInstance
    .patch(`/portfolios/${data._id}`, data, setAuthHeader())
    .then(res => res.data)
    .catch(err => rejectPromise(err));
};

export const deletePortfolio = async id => {
  return await axiosInstance
    .delete(`/portfolios/${id}`, setAuthHeader())
    .then(res => res.data);
};

/// Blog Actions
export const createBlog = async (data, lockId) => {
  return await axiosInstance
    .post(`/blogs?lockId=${lockId}`, data, setAuthHeader())
    .then(res => res.data)
    .catch(err => rejectPromise(err));
};

export const getBlogById = async id => {
  return await axiosInstance.get(`/blogs/${id}`).then(res => res.data);
};

export const updateBlog = async (data, id) => {
  return await axiosInstance
    .patch(`blogs/${id}`, data, setAuthHeader())
    .then(res => res.data)
    .catch(err => rejectPromise(err));
};

export const getUserBlogs = async req => {
  return await axiosInstance
    .get("/blogs/me", setAuthHeader(req))
    .then(res => res.data);
};

export const deleteBlog = id => {
  return axiosInstance
    .delete(`/blogs/${id}`, setAuthHeader())
    .then(res => res.data)
    .catch(err => rejectPromise(err));
};

export const getBlogs = async req => {
  return await axiosInstance
    .get("/blogs", setAuthHeader(req))
    .then(res => res.data);
};

export const getBlogBySlug = async slug => {
  return await axiosInstance
    .get(`/blogs/s/${slug}`, setAuthHeader())
    .then(res => res.data);
};
