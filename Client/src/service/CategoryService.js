import apiClient from "../api/apiClient";

export const addCategory = async (formData) => {
  return apiClient({
    method: 'POST',
    url: "/admin/categories",
    data: formData,
  });
};

export const deleteCategory = async (categoryId) => {
  return await apiClient.delete(
    `/admin/categories/${categoryId}`
  );
};


export const fetchCategories = async () => {
  return await apiClient.get(
    "/categories"
  );
};
