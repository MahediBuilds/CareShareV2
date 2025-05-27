import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import ClaimedPostCard from '@/components/ClaimedPostCard';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';

const Profile = () => {
  const { user } = useAuth();
  const { posts, getUserPosts } = useData();

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="text-center p-8">
            <CardContent>
              <h2 className="text-2xl font-bold mb-4">Please Login</h2>
              <p className="text-gray-600 mb-4">You need to be logged in to view your profile</p>
              <Button className="bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white">
                Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const userPosts = getUserPosts(user.id);
  const claimedPosts = posts.filter(post => post.claimedBy === user.id);
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'food': return 'bg-green-100 text-green-800';
      case 'clothes': return 'bg-blue-100 text-blue-800';
      case 'help': return 'bg-purple-100 text-purple-800';
      case 'errand': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeUntilExpiry = (expiry: Date) => {
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diff <= 0) return 'Expired';
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  const PostCard = ({ post, showClaimedStatus = false }: { post: any, showClaimedStatus?: boolean }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-emerald-100">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-2">
            {post.title}
          </CardTitle>
          <Badge className={getTypeColor(post.type)}>
            {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-gray-600 text-sm line-clamp-3">{post.description}</p>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            📍 {post.locality}
          </Badge>
          
          {post.expiry && (
            <Badge 
              variant="outline" 
              className={`text-xs ${
                new Date(post.expiry).getTime() - new Date().getTime() <= 3600000 
                  ? 'border-red-300 text-red-700 bg-red-50' 
                  : 'border-green-300 text-green-700 bg-green-50'
              }`}
            >
              ⏰ {getTimeUntilExpiry(new Date(post.expiry))}
            </Badge>
          )}
          
          {post.size && (
            <Badge variant="outline" className="text-xs">
              👕 Size {post.size}
            </Badge>
          )}
          
          {post.category && (
            <Badge variant="outline" className="text-xs">
              {post.category}
            </Badge>
          )}
          
          {post.timeNeeded && (
            <Badge variant="outline" className="text-xs">
              ⏱️ {post.timeNeeded}
            </Badge>
          )}

          {showClaimedStatus && post.claimed && (
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">
                ✅ Claimed by: {post.claimedBy === user.id ? 'You' : 'Someone else'}
              </Badge>
            </div>
          )}
        </div>

        {post.items && post.items.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-gray-500 mb-1">Items:</p>
            <div className="text-xs text-gray-700">
              {post.items.join(', ')}
            </div>
          </div>
        )}
        
        <p className="text-xs text-gray-500">
          Posted: {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8 border-emerald-100">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                  {user.user_metadata?.full_name || 'User Profile'}
                </CardTitle>
                <p className="text-gray-600">{user.email}</p>
                {user.user_metadata?.locality && (
                  <Badge variant="outline" className="mt-2">
                    📍 {user.user_metadata.locality}
                  </Badge>
                )}
              </div>
              <div className="text-right">
                <div className="bg-gradient-to-r from-emerald-500 to-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  {user.user_metadata?.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center border-emerald-100">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-emerald-600 mb-1">{userPosts.length}</div>
              <div className="text-gray-600">Posts Created</div>
            </CardContent>
          </Card>
          
          <Card className="text-center border-orange-100">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-orange-600 mb-1">{claimedPosts.length}</div>
              <div className="text-gray-600">Items Claimed</div>
            </CardContent>
          </Card>
          
          <Card className="text-center border-emerald-100">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-emerald-600 mb-1">
                {userPosts.filter(post => post.claimed).length}
              </div>
              <div className="text-gray-600">Posts Claimed by Others</div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Tabs */}
        <Tabs defaultValue="my-posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="my-posts" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800">
              My Posts ({userPosts.length})
            </TabsTrigger>
            <TabsTrigger value="claimed" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800">
              Claimed by Me ({claimedPosts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-posts">
            {userPosts.length === 0 ? (
              <Card className="text-center p-12 border-emerald-100">
                <CardContent>
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts yet</h3>
                  <p className="text-gray-600 mb-4">Start sharing with your community!</p>
                  <Button className="bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white">
                    Create First Post
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userPosts.map((post) => (
                  <PostCard key={post.id} post={post} showClaimedStatus={true} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="claimed">
            {claimedPosts.length === 0 ? (
              <Card className="text-center p-12 border-orange-100">
                <CardContent>
                  <div className="text-6xl mb-4">🤲</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No claimed items yet</h3>
                  <p className="text-gray-600 mb-4">Browse the dashboard to find items you can claim!</p>
                  <Button className="bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white">
                    Browse Posts
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {claimedPosts.map((post) => (
                  <ClaimedPostCard 
                    key={post.id} 
                    post={post}
                    ownerPhone={user?.user_metadata?.phone}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
