import apiClient from "../api/apiClient";

export const addUser = async (user) => {
  return await apiClient.post(
    `/admin/register`,
    user
  );
};

export const deleteUser = async(userId) => {
    return await apiClient.delete(
    `/admin/user/${userId}`
  );
}

export const fetchUsers = async () => {
  return await apiClient.get(
    "/admin/users"
  );
};
