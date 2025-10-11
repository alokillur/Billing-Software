import axios from 'axios';

export const addCategory = async (formData) => {
  return await axios.post(
    'http://localhost:8080/api/v1.0/categories/add',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

export const deleteCategory = async (categoryId) => {
    return await axios.delete(`http://localhost:8080/api/v1.0/categories/${categoryId}`, categoryId);
}

export const fetchCategories = async () => {
    return await axios.get('http://localhost:8080/api/v1.0/categories');
}

