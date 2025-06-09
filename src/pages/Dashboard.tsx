
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import PostCard from '@/components/PostCard';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { BENGALURU_LOCALITIES } from '@/lib/constants';
import { TrendingUp, Users, Gift, Clock, Plus, Filter } from 'lucide-react';

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

  // Calculate stats
  const totalPosts = posts.length;
  const userPosts = posts.filter(post => post.userId === user?.id).length;
  const claimedPosts = posts.filter(post => post.claimed).length;
  const recentPosts = posts.filter(post => {
    const dayAgo = new Date();
    dayAgo.setHours(dayAgo.getHours() - 24);
    return new Date(post.createdAt) > dayAgo;
  }).length;

  const quickActions = [
    { 
      title: "Donate Food", 
      icon: "🍽️", 
      link: "/donate-food", 
      description: "Share leftover food",
      gradient: "from-green-500 to-emerald-600"
    },
    { 
      title: "Donate Clothes", 
      icon: "👕", 
      link: "/donate-clothes", 
      description: "Give away clothes",
      gradient: "from-blue-500 to-cyan-600"
    },
    { 
      title: "Offer Help", 
      icon: "🤝", 
      link: "/post-help", 
      description: "Help with tasks",
      gradient: "from-purple-500 to-pink-600"
    },
    { 
      title: "Request Errand", 
      icon: "🛒", 
      link: "/request-errand", 
      description: "Ask for help",
      gradient: "from-orange-500 to-red-600"
    },
  ];

  const stats = [
    {
      title: "Total Posts",
      value: totalPosts,
      icon: TrendingUp,
      description: "in your community"
    },
    {
      title: "Active Users",
      value: new Set(posts.map(post => post.userId)).size,
      icon: Users,
      description: "sharing & caring"
    },
    {
      title: "Items Claimed",
      value: claimedPosts,
      icon: Gift,
      description: "successfully matched"
    },
    {
      title: "Recent Posts",
      value: recentPosts,
      icon: Clock,
      description: "in last 24 hours"
    }
  ];

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="text-center p-8 max-w-md mx-4">
            <CardContent className="pt-6">
              <div className="text-6xl mb-4">🔐</div>
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
                Welcome to CareShare
              </h2>
              <p className="text-muted-foreground mb-6">
                Join our community to start sharing, caring, and making a difference in your neighborhood.
              </p>
              <Link to="/login">
                <Button className="bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white w-full">
                  Get Started
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
      <div className="max-w-7xl mx-auto py-6 space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
            Welcome back, {user.user_metadata?.full_name?.split(' ')[0] || 'Friend'}! 👋
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here's what's happening in your community. Together, we're making a difference one share at a time.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                  <div className="p-2 bg-gradient-to-br from-emerald-100 to-orange-100 rounded-lg">
                    <stat.icon className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Plus className="h-6 w-6 text-emerald-600" />
              Quick Actions
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 hover:border-emerald-200">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-emerald-600 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Filters Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Explore Community Posts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="food">🍽️ Food</SelectItem>
                    <SelectItem value="clothes">👕 Clothes</SelectItem>
                    <SelectItem value="help">🤝 Help Tasks</SelectItem>
                    <SelectItem value="errand">🛒 Errands</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Select value={localityFilter} onValueChange={setLocalityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by locality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Localities</SelectItem>
                    {BENGALURU_LOCALITIES.map((locality) => (
                      <SelectItem key={locality} value={locality}>
                        📍 {locality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filter Results Badge */}
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {filteredPosts.length} posts found
              </Badge>
              {typeFilter !== 'all' && (
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  onClick={() => setTypeFilter('all')}
                >
                  {typeFilter} ✕
                </Badge>
              )}
              {localityFilter !== 'all' && (
                <Badge 
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  onClick={() => setLocalityFilter('all')}
                >
                  {localityFilter} ✕
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Posts Grid */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <Card className="text-center p-12">
              <CardContent className="space-y-4">
                <div className="text-6xl">🌱</div>
                <h3 className="text-xl font-semibold">
                  {posts.length === 0 ? "Start the Change!" : "No matching posts"}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {posts.length === 0 
                    ? "Be the first to share something with your community and inspire others to join the movement!" 
                    : "Try adjusting your filters to discover more posts, or be the first to share something new!"}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/donate-food">
                    <Button className="bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white">
                      Share Something
                    </Button>
                  </Link>
                  {filteredPosts.length === 0 && posts.length > 0 && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setTypeFilter('all');
                        setLocalityFilter('all');
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
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
