import api from './api';
import useAuthStore from '../stores/authStore';

export async function fetchCurrentUser() {
  try {
    const res = await api.get('/auth/me');
    const { user } = res.data;
    const accessToken = res.data.accessToken || null;
    if (accessToken) useAuthStore.getState().setAuth(user, accessToken);
    else useAuthStore.getState().setAuth(user, useAuthStore.getState().accessToken);
    return user;
  } catch (err) {
    useAuthStore.getState().clearAuth();
    return null;
  }
}
