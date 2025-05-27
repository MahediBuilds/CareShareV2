import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import ImpactSection from '@/components/ImpactSection';
import CommunityFeatures from '@/components/CommunityFeatures';
import NewsletterSection from '@/components/NewsletterSection';

const Homepage = () => {
  const { user } = useAuth();

  const features = [
    {
      title: "Donate Food",
      description: "Share leftover food with those in need and reduce waste",
      icon: "🍽️",
      link: "/donate-food"
    },
    {
      title: "Donate Clothes",
      description: "Give away clothes you no longer need to help others",
      icon: "👕",
      link: "/donate-clothes"
    },
    {
      title: "Offer Help",
      description: "Post tasks where you can help others in your community",
      icon: "🤝",
      link: "/post-help"
    },
    {
      title: "Request Errands",
      description: "Ask neighbors to help with shopping or other errands",
      icon: "🛒",
      link: "/request-errand"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                <span className="bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
                  Share Care,
                </span>
                <br />
                <span className="text-gray-800">Build Community</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in">
                Connect with your neighbors to share resources, offer help, and build a stronger community. 
                From donating food to running errands, every act of kindness counts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                {user ? (
                  <Link to="/dashboard">
                    <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white px-8 py-3 text-lg hover-scale">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white px-8 py-3 text-lg hover-scale">
                        Get Started
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" size="lg" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-8 py-3 text-lg hover-scale">
                        Login
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Floating decoration elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-16 h-16 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 right-20 w-12 h-12 bg-emerald-300 rounded-full opacity-30 animate-pulse"></div>
        </section>

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Ways to Make a Difference
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose how you want to help your community and get started today
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-emerald-100 hover:-translate-y-1">
                  <CardHeader>
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl text-gray-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    {user && (
                      <Link to={feature.link}>
                        <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover-scale">
                          Get Started
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <ImpactSection />

        {/* Community Features */}
        <CommunityFeatures />

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Growing Together
              </h2>
              <p className="text-lg text-gray-600">
                Real numbers from our thriving community
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-8 border border-emerald-200 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-emerald-600 mb-2">10,000+</div>
                <div className="text-gray-600 font-medium">Items Shared</div>
                <div className="text-sm text-gray-500 mt-1">This month alone</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 border border-orange-200 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-orange-600 mb-2">5,000+</div>
                <div className="text-gray-600 font-medium">Community Members</div>
                <div className="text-sm text-gray-500 mt-1">And growing daily</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-8 border border-emerald-200 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-emerald-600 mb-2">15</div>
                <div className="text-gray-600 font-medium">Localities Covered</div>
                <div className="text-sm text-gray-500 mt-1">Expanding soon</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Newsletter Section */}
        <NewsletterSection />

        {/* CTA Section */}
        {!user && (
          <section className="py-20 bg-gradient-to-r from-emerald-500 to-orange-500">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl text-emerald-100 mb-8">
                Join thousands of community members who are already sharing and caring
              </p>
              <Link to="/register">
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-3 text-lg hover-scale">
                  Join CareShare Today
                </Button>
              </Link>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default Homepage;
