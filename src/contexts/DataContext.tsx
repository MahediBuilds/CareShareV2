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

const STORAGE_KEY = 'careshare-posts';
const MAX_STORAGE_SIZE = 4 * 1024 * 1024; // 4MB limit to stay well under localStorage limits

// Utility functions for storage management
const getStorageSize = (data: any): number => {
  return new Blob([JSON.stringify(data)]).size;
};

const compressImage = (base64String: string, quality: number = 0.7): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions (max 800px width)
      const maxWidth = 800;
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUrl);
    };
    
    img.src = base64String;
  });
};

const cleanupOldPosts = (posts: Post[]): Post[] => {
  // Keep only last 50 posts to manage storage
  const sortedPosts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return sortedPosts.slice(0, 50);
};

const safeSetLocalStorage = async (key: string, data: Post[]): Promise<boolean> => {
  try {
    let processedData = [...data];
    
    // First, try to compress images if they exist
    for (const post of processedData) {
      if (post.images && post.images.length > 0) {
        const compressedImages = await Promise.all(
          post.images.map(img => 
            img.startsWith('data:') ? compressImage(img, 0.6) : Promise.resolve(img)
          )
        );
        post.images = compressedImages;
        if (post.image && post.image.startsWith('data:')) {
          post.image = compressedImages[0];
        }
      } else if (post.image && post.image.startsWith('data:')) {
        post.image = await compressImage(post.image, 0.6);
      }
    }
    
    // Check size and cleanup if needed
    while (getStorageSize(processedData) > MAX_STORAGE_SIZE && processedData.length > 10) {
      processedData = cleanupOldPosts(processedData);
      // Remove oldest post
      processedData.pop();
    }
    
    localStorage.setItem(key, JSON.stringify(processedData));
    console.log(`Storage successful. Size: ${(getStorageSize(processedData) / 1024 / 1024).toFixed(2)}MB, Posts: ${processedData.length}`);
    return true;
  } catch (error) {
    console.error('Storage quota exceeded, attempting cleanup...', error);
    
    // Emergency cleanup - keep only last 20 posts and remove all images
    const emergencyData = data.slice(0, 20).map(post => ({
      ...post,
      image: undefined,
      images: undefined
    }));
    
    try {
      localStorage.setItem(key, JSON.stringify(emergencyData));
      console.log('Emergency cleanup successful');
      return true;
    } catch (emergencyError) {
      console.error('Emergency cleanup failed, clearing storage', emergencyError);
      localStorage.removeItem(key);
      return false;
    }
  }
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const savedPosts = localStorage.getItem(STORAGE_KEY);
      const parsedPosts = savedPosts ? JSON.parse(savedPosts) : [];
      console.log(`Loaded ${parsedPosts.length} posts from storage`);
      return parsedPosts;
    } catch (error) {
      console.error('Error loading posts from storage:', error);
      return [];
    }
  });

  useEffect(() => {
    // Debounced save to avoid excessive storage operations
    const timeoutId = setTimeout(() => {
      safeSetLocalStorage(STORAGE_KEY, posts);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [posts]);

  const addPost = (postData: Omit<Post, 'id' | 'createdAt'>) => {
    const newPost: Post = {
      ...postData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    
    console.log('Adding new post:', newPost.title);
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
