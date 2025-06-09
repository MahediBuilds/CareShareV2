
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
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="text-center p-6 sm:p-8 max-w-md mx-auto w-full animate-fade-in">
            <CardContent className="pt-6">
              <div className="text-4xl sm:text-6xl mb-4 animate-pulse">🔐</div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
                Welcome to CareShare
              </h2>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                Join our community to start sharing, caring, and making a difference in your neighborhood.
              </p>
              <Link to="/login">
                <Button className="bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white w-full transition-all duration-300 hover:shadow-lg hover:scale-105">
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
      <div className="max-w-7xl mx-auto py-4 sm:py-6 space-y-6 sm:space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-2 sm:space-y-3 px-2 animate-fade-in">
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
            Welcome back, {user.user_metadata?.full_name?.split(' ')[0] || 'Friend'}! 👋
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Here's what's happening in your community. Together, we're making a difference one share at a time.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-2">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{stat.title}</p>
                    <p className="text-lg sm:text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">{stat.description}</p>
                  </div>
                  <div className="p-2 bg-gradient-to-br from-emerald-100 to-orange-100 rounded-lg flex-shrink-0">
                    <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4 px-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
              <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
              Quick Actions
            </h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 hover:border-emerald-200 animate-fade-in" style={{ animationDelay: `${(index + 4) * 100}ms` }}>
                  <CardContent className="p-4 sm:p-6 text-center space-y-2 sm:space-y-3">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-xl sm:rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center text-lg sm:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-lg group-hover:text-emerald-600 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{action.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Filters Section */}
        <Card className="mx-2 animate-fade-in" style={{ animationDelay: '800ms' }}>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
              Explore Community Posts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="h-10 sm:h-11">
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
                  <SelectTrigger className="h-10 sm:h-11">
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
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs sm:text-sm">
                {filteredPosts.length} posts found
              </Badge>
              {typeFilter !== 'all' && (
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 hover:scale-105 text-xs sm:text-sm"
                  onClick={() => setTypeFilter('all')}
                >
                  {typeFilter} ✕
                </Badge>
              )}
              {localityFilter !== 'all' && (
                <Badge 
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 hover:scale-105 text-xs sm:text-sm"
                  onClick={() => setLocalityFilter('all')}
                >
                  {localityFilter} ✕
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Posts Grid */}
        <div className="space-y-4 px-2">
          {filteredPosts.length === 0 ? (
            <Card className="text-center p-8 sm:p-12 animate-fade-in">
              <CardContent className="space-y-4">
                <div className="text-4xl sm:text-6xl animate-pulse">🌱</div>
                <h3 className="text-lg sm:text-xl font-semibold">
                  {posts.length === 0 ? "Start the Change!" : "No matching posts"}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
                  {posts.length === 0 
                    ? "Be the first to share something with your community and inspire others to join the movement!" 
                    : "Try adjusting your filters to discover more posts, or be the first to share something new!"}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/donate-food">
                    <Button className="bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white transition-all duration-300 hover:shadow-lg hover:scale-105 w-full sm:w-auto">
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
                      className="transition-all duration-200 hover:scale-105 w-full sm:w-auto"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredPosts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="animate-fade-in transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
