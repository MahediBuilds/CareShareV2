
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import PostCard from '@/components/PostCard';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { BENGALURU_LOCALITIES } from '@/lib/constants';

const Dashboard = () => {
  const { user } = useAuth();
  const { posts } = useData();
  const [typeFilter, setTypeFilter] = useState('all');
  const [localityFilter, setLocalityFilter] = useState('all');

  const filteredPosts = posts.filter(post => {
    if (typeFilter !== 'all' && post.type !== typeFilter) return false;
    if (localityFilter !== 'all' && post.locality !== localityFilter) return false;
    return true;
  });

  const quickActions = [
    { title: "Donate Food", icon: "🍽️", link: "/donate-food", description: "Share leftover food" },
    { title: "Donate Clothes", icon: "👕", link: "/donate-clothes", description: "Give away clothes" },
    { title: "Offer Help", icon: "🤝", link: "/post-help", description: "Help with tasks" },
    { title: "Request Errand", icon: "🛒", link: "/request-errand", description: "Ask for help" },
  ];

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="text-center p-8">
            <CardContent>
              <h2 className="text-2xl font-bold mb-4">Please Login</h2>
              <p className="text-gray-600 mb-4">You need to be logged in to access the dashboard</p>
              <Link to="/login">
                <Button className="bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white">
                  Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user.user_metadata?.full_name || user.email}!
          </h1>
          <p className="text-gray-600">Here's what's happening in your community</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer border-emerald-100 hover:border-emerald-300">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{action.icon}</div>
                    <h3 className="font-semibold text-gray-800 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="border-emerald-200">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="clothes">Clothes</SelectItem>
                  <SelectItem value="help">Help Tasks</SelectItem>
                  <SelectItem value="errand">Errands</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Select value={localityFilter} onValueChange={setLocalityFilter}>
                <SelectTrigger className="border-emerald-200">
                  <SelectValue placeholder="Filter by locality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Localities</SelectItem>
                  {BENGALURU_LOCALITIES.map((locality) => (
                    <SelectItem key={locality} value={locality}>
                      {locality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Community Posts ({filteredPosts.length})
            </h2>
          </div>
          
          {filteredPosts.length === 0 ? (
            <Card className="text-center p-12 border-emerald-100">
              <CardContent>
                <div className="text-6xl mb-4">🌱</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts found</h3>
                <p className="text-gray-600 mb-4">
                  {posts.length === 0 
                    ? "Be the first to share something with your community!" 
                    : "Try adjusting your filters to see more posts."}
                </p>
                <Link to="/donate-food">
                  <Button className="bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white">
                    Create First Post
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
