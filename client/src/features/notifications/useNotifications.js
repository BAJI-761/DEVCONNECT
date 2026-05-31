import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/api';
import { useAuthStore } from '../../stores/authStore';

let socket;

export const initializeSocket = (userId) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
      withCredentials: true,
    });
  }
  socket.emit('join', userId);
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const useSocket = () => {
  const user = useAuthStore(state => state.user);
  
  useEffect(() => {
    if (user) {
      initializeSocket(user._id);
    } else {
      disconnectSocket();
    }
    
    return () => {
      // Don't disconnect on every re-render, only on full unmount or logout
    };
  }, [user]);

  return socket;
};

// Fetch notifications
export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data } = await api.get('/notifications');
      return data.data;
    },
    refetchInterval: 30000, // Fallback polling just in case socket misses something
  });
};

// Mark as read
export const useMarkNotificationsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      await api.put('/notifications/read');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
