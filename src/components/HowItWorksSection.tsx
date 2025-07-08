
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HowItWorksSection = () => {
  const steps = [
    {
      step: "1",
      title: "Sign Up",
      description: "Create your free account and join our caring community",
      icon: "👋",
      color: "bg-emerald-100 text-emerald-700"
    },
    {
      step: "2", 
      title: "Post or Browse",
      description: "Share items you want to donate or browse what others are offering",
      icon: "📱",
      color: "bg-blue-100 text-blue-700"
    },
    {
      step: "3",
      title: "Connect",
      description: "Message other community members to coordinate exchanges",
      icon: "💬",
      color: "bg-orange-100 text-orange-700"
    },
    {
      step: "4",
      title: "Share Care",
      description: "Meet up safely and make a positive impact in your community",
      icon: "❤️",
      color: "bg-pink-100 text-pink-700"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How CareShare Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting started is simple. Follow these four easy steps to begin sharing and caring in your community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-200 border-0 bg-white">
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-full ${step.color} mx-auto flex items-center justify-center text-2xl font-bold mb-4`}>
                  {step.step}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <CardTitle className="text-xl text-gray-800">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
