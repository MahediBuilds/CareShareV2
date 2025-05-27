
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CommunitySpotlight = () => {
  const spotlightStories = [
    {
      title: "Local Family Finds Hope",
      location: "Downtown District",
      story: "When the Martinez family faced unexpected job loss, CareShare neighbors stepped in with food donations and job leads. Today, they're back on their feet and paying it forward.",
      category: "Success Story",
      image: "🏠",
      date: "2 weeks ago"
    },
    {
      title: "Student Clothing Drive",
      location: "University Area", 
      story: "Local college students organized a massive clothing drive through CareShare, collecting over 1,000 items for families preparing kids for school.",
      category: "Community Event",
      image: "🎓",
      date: "1 month ago"
    },
    {
      title: "Senior Support Network",
      location: "Westside Neighborhood",
      story: "A group of volunteers used CareShare to coordinate grocery deliveries for elderly residents, creating lasting friendships in the process.",
      category: "Volunteer Initiative",
      image: "👴",
      date: "3 weeks ago"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Community Spotlight
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrating the amazing stories and connections happening in our CareShare communities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {spotlightStories.map((story, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-emerald-100 bg-white">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    {story.category}
                  </Badge>
                  <span className="text-sm text-gray-500">{story.date}</span>
                </div>
                <div className="text-4xl mb-4 text-center">{story.image}</div>
                <CardTitle className="text-xl text-gray-800">{story.title}</CardTitle>
                <p className="text-sm text-orange-600 font-medium">{story.location}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{story.story}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySpotlight;
