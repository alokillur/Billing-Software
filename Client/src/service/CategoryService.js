import axios from "axios";

export const addCategory = async (formData) => {
  const token = localStorage.getItem("token");
  return axios({
    method: 'POST',
    url: "http://localhost:8080/api/v1.0/admin/categories",
    data: formData,
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
};

export const deleteCategory = async (categoryId) => {
  return await axios.delete(
    `http://localhost:8080/api/v1.0/admin/categories/${categoryId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
};


export const fetchCategories = async () => {
  return await axios.get(
    "http://localhost:8080/api/v1.0/categories",

    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
};
