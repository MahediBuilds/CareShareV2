
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ImpactSection = () => {
  const impactStats = [
    {
      number: "50,000+",
      label: "Meals Shared",
      description: "Nutritious meals provided to families in need",
      icon: "🍽️",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      number: "25,000+",
      label: "Clothing Items",
      description: "Pieces of clothing given new life",
      icon: "👕",
      color: "from-blue-500 to-blue-600"
    },
    {
      number: "15,000+",
      label: "Acts of Kindness",
      description: "Helping hands extended to neighbors",
      icon: "🤝",
      color: "from-orange-500 to-orange-600"
    },
    {
      number: "500+",
      label: "Tons Diverted",
      description: "Waste prevented from reaching landfills",
      icon: "🌱",
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 to-orange-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Community Impact
          </h2>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Together, we're making a real difference in communities across the region
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactStats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors duration-200">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-emerald-100 mb-2">{stat.label}</div>
                <p className="text-sm text-emerald-200">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
