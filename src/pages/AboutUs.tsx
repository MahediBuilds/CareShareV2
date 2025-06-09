
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Zain Mahedi",
      role: "Co-Founder & Developer",
      bio: "Passionate about building technology that brings communities together",
      skills: ["Full-Stack Development", "Community Building"]
    },
    {
      name: "Yeruva Taniya Paul",
      role: "Co-Founder & Designer",
      bio: "Creating beautiful, user-centered experiences that make a difference",
      skills: ["UI/UX Design", "Visual Identity"]
    },
    {
      name: "Vimarsh Buyyani",
      role: "Co-Founder & Product Lead",
      bio: "Dedicated to solving real-world problems through innovative solutions",
      skills: ["Product Strategy", "User Research"]
    },
    {
      name: "Tanmay Agarwal",
      role: "Co-Founder & Technical Lead",
      bio: "Engineering scalable solutions for community-driven platforms",
      skills: ["System Architecture", "Technical Leadership"]
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

          {/* Enhanced Team Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-orange-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                CareShare was founded by a passionate team of individuals who believe in the transformative 
                power of community and technology. Each bringing unique expertise and a shared vision of 
                creating meaningful connections between neighbors.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {teamMembers.map((member, index) => (
                <Card key={index} className="group relative overflow-hidden border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-orange-500"></div>
                  
                  <CardHeader className="text-center pb-4">
                    <div className="relative mx-auto mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 via-emerald-600 to-orange-500 rounded-full mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <span className="text-white font-bold text-3xl">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-emerald-400 to-orange-400 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    </div>
                    
                    <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                      {member.name}
                    </CardTitle>
                    
                    <Badge variant="secondary" className="bg-gradient-to-r from-emerald-100 to-orange-100 text-emerald-800 border-emerald-200 font-medium">
                      {member.role}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="text-center pt-0">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">
                      "{member.bio}"
                    </p>
                    
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Expertise
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {member.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span>Building the future of community sharing, together</span>
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              </div>
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
