
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';

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
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
                  Share Care,
                </span>
                <br />
                <span className="text-gray-800">Build Community</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Connect with your neighbors to share resources, offer help, and build a stronger community. 
                From donating food to running errands, every act of kindness counts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user ? (
                  <Link to="/dashboard">
                    <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white px-8 py-3 text-lg">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white px-8 py-3 text-lg">
                        Get Started
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" size="lg" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-8 py-3 text-lg">
                        Login
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                How CareShare Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Simple ways to help your community and get help when you need it
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-200 border-emerald-100">
                  <CardHeader>
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl text-gray-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    {user && (
                      <Link to={feature.link}>
                        <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
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

        {/* Stats Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-emerald-100">
                <div className="text-3xl font-bold text-emerald-600 mb-2">10,000+</div>
                <div className="text-gray-600">Items Shared</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-orange-100">
                <div className="text-3xl font-bold text-orange-600 mb-2">5,000+</div>
                <div className="text-gray-600">Community Members</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-emerald-100">
                <div className="text-3xl font-bold text-emerald-600 mb-2">15</div>
                <div className="text-gray-600">Localities Covered</div>
              </div>
            </div>
          </div>
        </section>

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
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-3 text-lg">
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
