import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/api';
import { useAuthStore } from '../../stores/authStore';

// Fetch profile
export const useUserProfile = (username) => {
  return useQuery({
    queryKey: ['profile', username],
    queryFn: async () => {
      const { data } = await api.get(`/users/${username}`);
      return data.data;
    },
    enabled: !!username,
  });
};

// Update profile info
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);
  
  return useMutation({
    mutationFn: async (profileData) => {
      const { data } = await api.put('/users/profile', profileData);
      return data.data;
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ['profile', updatedUser.username] });
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
};

// Upload Avatar
export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);
  
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.put('/users/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return data.data;
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ['profile', updatedUser.username] });
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
};

// Upload Cover
export const useUploadCover = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);
  
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.put('/users/cover', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return data.data;
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ['profile', updatedUser.username] });
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
};

// Follow/Unfollow User
export const useFollowUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, action }) => {
      const { data } = await api.post(`/users/${userId}/${action}`); // action = 'follow' or 'unfollow'
      return data;
    },
    onSuccess: (_, variables) => {
      // Invalidate relevant queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['suggestedUsers'] });
    },
  });
};

export const useSuggestedUsers = () => {
  return useQuery({
    queryKey: ['suggestedUsers'],
    queryFn: async () => {
      const { data } = await api.get('/users/suggested');
      return data.data;
    },
  });
};
