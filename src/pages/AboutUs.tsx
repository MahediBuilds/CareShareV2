
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Zain Mahedi",
      role: "Co-Founder & Developer",
    },
    {
      name: "Yeruva Taniya Paul",
      role: "Co-Founder & Designer",
    },
    {
      name: "Vimarsh Buyyani",
      role: "Co-Founder & Product Lead",
    },
    {
      name: "Tanmay Aggarwal",
      role: "Co-Founder & Technical Lead",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
                About CareShare
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building stronger communities through shared resources and mutual support
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <Card className="border-emerald-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-gray-800">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-gray-600 leading-relaxed">
                  CareShare was born from a simple belief: communities are stronger when neighbors help neighbors. 
                  We've created a platform that makes it easy to share resources, offer help, and build meaningful 
                  connections with people in your locality. Whether it's donating food, sharing clothes, offering 
                  assistance, or requesting help with errands, CareShare brings communities together through acts 
                  of kindness and mutual support.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center border-emerald-100 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-2">🤝</div>
                  <CardTitle className="text-xl">Community First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We believe in the power of community and the strength that comes from neighbors helping neighbors.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-orange-100 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-2">🌱</div>
                  <CardTitle className="text-xl">Sustainability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Reducing waste and promoting sustainable living through sharing and reusing resources.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-emerald-100 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-2">💝</div>
                  <CardTitle className="text-xl">Kindness</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Every act of kindness, no matter how small, has the power to make a difference in someone's life.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Meet Our Team</h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              CareShare was founded by a passionate team of individuals who believe in the power of community 
              and technology to create positive change.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center border-emerald-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                      {member.role}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Impact Section */}
          <div className="text-center">
            <Card className="border-emerald-100 bg-gradient-to-r from-emerald-50 to-orange-50">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Join Our Growing Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-600 mb-6">
                  Together, we're building a more connected, caring, and sustainable world. 
                  Every contribution matters, and every act of kindness creates a ripple effect 
                  that strengthens our entire community.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-emerald-600">10,000+</div>
                    <div className="text-gray-600">Items Shared</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600">5,000+</div>
                    <div className="text-gray-600">Community Members</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-emerald-600">15</div>
                    <div className="text-gray-600">Localities Covered</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
