import api from "./ApiInstance";

export const checkAuth = () => api.get("/member/home");
export const updateProfile = (formData) => {
  return api.put("/member/edit-profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const updatePrivacySettings = (data) => {
  return api.put("/member/privacy", data);
};