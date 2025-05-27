
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CommunityFeatures = () => {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  const features = [
    {
      title: "Local Food Sharing",
      description: "Connect with neighbors to share fresh produce, home-cooked meals, and pantry items safely within your community.",
      summary: "Our food sharing network helps reduce waste while ensuring no one goes hungry. Members can post available meals, organize potluck events, and coordinate food drives. All exchanges follow safety guidelines and community standards.",
      icon: "🥘",
      stats: "2,500+ meals shared",
      color: "bg-orange-100 border-orange-200",
      badgeColor: "bg-orange-500"
    },
    {
      title: "Clothing Exchange Network",
      description: "Give clothes a second life by sharing with families who need them. From baby clothes to work attire.",
      summary: "Transform your closet cleanouts into community resources. Our clothing exchange includes size-sorting systems, seasonal collections, and special categories for professional wear, children's clothes, and formal attire.",
      icon: "👔",
      stats: "1,800+ items exchanged",
      color: "bg-blue-100 border-blue-200",
      badgeColor: "bg-blue-500"
    },
    {
      title: "Neighbor Helping Hands",
      description: "Offer or request help with daily tasks like grocery shopping, pet sitting, or moving assistance.",
      summary: "Build meaningful connections while getting things done. Our platform includes skill matching, scheduling tools, and a reputation system to ensure reliable, trustworthy assistance for everything from tech support to garden care.",
      icon: "🤲",
      stats: "850+ acts of kindness",
      color: "bg-emerald-100 border-emerald-200",
      badgeColor: "bg-emerald-500"
    },
    {
      title: "Community Events Hub",
      description: "Organize and join local events, from neighborhood cleanups to potluck dinners and skill sharing.",
      summary: "Strengthen community bonds through shared experiences. Features include event planning tools, RSVP management, and categories for social gatherings, educational workshops, and volunteer opportunities.",
      icon: "🎉",
      stats: "200+ events hosted",
      color: "bg-purple-100 border-purple-200",
      badgeColor: "bg-purple-500"
    },
    {
      title: "Skill Sharing & Learning Exchange",
      description: "Share your expertise and learn from others in your community. From language lessons to professional skills.",
      summary: "Connect with neighbors to exchange knowledge and skills. Our platform facilitates language exchange programs, professional workshops, tutoring sessions, and creative classes. Match with others based on skills offered and needed, schedule sessions, and build lasting learning relationships.",
      icon: "🎓",
      stats: "150+ skills shared",
      color: "bg-yellow-100 border-yellow-200",
      badgeColor: "bg-yellow-500"
    },
    {
      title: "Safety & Emergency Support",
      description: "Build a reliable safety network with your neighbors for emergency situations and daily security.",
      summary: "Create a trusted emergency response network in your community. Features include emergency contact coordination, elderly check-in systems, child pickup assistance, and medical emergency response teams. Stay connected and ensure everyone's safety through verified community members.",
      icon: "🚨",
      stats: "300+ safety connections",
      color: "bg-red-100 border-red-200",
      badgeColor: "bg-red-500"
    }
  ];

  const toggleFeature = (index: number) => {
    setExpandedFeature(expandedFeature === index ? null : index);
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                {expandedFeature === index && (
                  <div className="bg-white/70 rounded-lg p-4 mb-4 border border-gray-200">
                    <p className="text-gray-700 text-sm leading-relaxed">{feature.summary}</p>
                  </div>
                )}
                <Button 
                  variant="outline" 
                  className="w-full border-gray-300 text-gray-700 hover:bg-white/80"
                  onClick={() => toggleFeature(index)}
                >
                  {expandedFeature === index ? 'Show Less' : 'Learn More'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityFeatures;
