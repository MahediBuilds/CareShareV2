
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CommunityFeatures = () => {
  const features = [
    {
      title: "Local Food Sharing",
      description: "Connect with neighbors to share fresh produce, home-cooked meals, and pantry items safely within your community.",
      icon: "🥘",
      stats: "2,500+ meals shared",
      color: "bg-orange-100 border-orange-200",
      badgeColor: "bg-orange-500"
    },
    {
      title: "Clothing Exchange Network",
      description: "Give clothes a second life by sharing with families who need them. From baby clothes to work attire.",
      icon: "👔",
      stats: "1,800+ items exchanged",
      color: "bg-blue-100 border-blue-200",
      badgeColor: "bg-blue-500"
    },
    {
      title: "Neighbor Helping Hands",
      description: "Offer or request help with daily tasks like grocery shopping, pet sitting, or moving assistance.",
      icon: "🤲",
      stats: "850+ acts of kindness",
      color: "bg-emerald-100 border-emerald-200",
      badgeColor: "bg-emerald-500"
    },
    {
      title: "Community Events Hub",
      description: "Organize and join local events, from neighborhood cleanups to potluck dinners and skill sharing.",
      icon: "🎉",
      stats: "200+ events hosted",
      color: "bg-purple-100 border-purple-200",
      badgeColor: "bg-purple-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Community Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the many ways you can connect, share, and make a difference in your local community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className={`${feature.color} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-5xl">{feature.icon}</div>
                  <Badge className={`${feature.badgeColor} text-white`}>
                    {feature.stats}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-gray-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-300 text-gray-700 hover:bg-white/80"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-3"
          >
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunityFeatures;
