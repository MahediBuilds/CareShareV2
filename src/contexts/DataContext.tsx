
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Post {
  id: string;
  type: 'food' | 'clothes' | 'help' | 'errand';
  title: string;
  description: string;
  locality: string;
  userId: string;
  userEmail: string;
  createdAt: Date;
  claimedBy?: string;
  claimed?: boolean;
  // Specific fields
  expiry?: Date;
  size?: string;
  category?: string;
  timeNeeded?: string;
  items?: string[];
  // New payment fields for errands
  payment?: number;
  paymentType?: 'fixed' | 'negotiable';
  currency?: string;
  // Image fields for posts
  image?: string; // Keep for backward compatibility
  images?: string[]; // New field for multiple images
}

interface DataContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'createdAt'>) => void;
  claimPost: (postId: string, userId: string) => void;
  getUserPosts: (userId: string) => Post[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const savedPosts = localStorage.getItem('careshare-posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  useEffect(() => {
    localStorage.setItem('careshare-posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (postData: Omit<Post, 'id' | 'createdAt'>) => {
    const newPost: Post = {
      ...postData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const claimPost = (postId: string, userId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, claimed: true, claimedBy: userId }
        : post
    ));
  };

  const getUserPosts = (userId: string) => {
    return posts.filter(post => post.userId === userId);
  };

  const value = {
    posts,
    addPost,
    claimPost,
    getUserPosts,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
