import axios from 'axios';
import queryString from 'query-string';
import { UserRoleInterface, UserRoleGetQueryInterface } from 'interfaces/user-role';
import { GetQueryInterface } from '../../interfaces';

export const getUserRoles = async (query?: UserRoleGetQueryInterface) => {
  const response = await axios.get(`/api/user-roles${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createUserRole = async (userRole: UserRoleInterface) => {
  const response = await axios.post('/api/user-roles', userRole);
  return response.data;
};

export const updateUserRoleById = async (id: string, userRole: UserRoleInterface) => {
  const response = await axios.put(`/api/user-roles/${id}`, userRole);
  return response.data;
};

export const getUserRoleById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/user-roles/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteUserRoleById = async (id: string) => {
  const response = await axios.delete(`/api/user-roles/${id}`);
  return response.data;
};
