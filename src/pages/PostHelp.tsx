
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { toast } from '@/hooks/use-toast';
import { BENGALURU_LOCALITIES } from '@/lib/constants';

const PostHelp = () => {
  const { user } = useAuth();
  const { addPost } = useData();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    timeNeeded: '',
    locality: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to post help tasks",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      addPost({
        type: 'help',
        title: formData.title,
        description: formData.description,
        locality: formData.locality,
        userId: user.id,
        userEmail: user.email || '',
        timeNeeded: formData.timeNeeded,
      });

      toast({
        title: "Help task posted!",
        description: "Your help offer has been shared with the community.",
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post help task",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="text-center p-8">
            <CardContent>
              <h2 className="text-2xl font-bold mb-4">Please Login</h2>
              <p className="text-gray-600 mb-4">You need to be logged in to post help tasks</p>
              <Button onClick={() => navigate('/login')} className="bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white">
                Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-emerald-100">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
              🤝 Offer Help
            </CardTitle>
            <p className="text-gray-600">Share how you can help your community</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Help Title *</Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Computer Setup Help, Moving Assistance"
                  required
                  className="border-emerald-200 focus:border-emerald-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Task Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the task you can help with, your skills, availability..."
                  required
                  className="border-emerald-200 focus:border-emerald-400 min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeNeeded">Time Commitment *</Label>
                <Select value={formData.timeNeeded} onValueChange={(value) => handleInputChange('timeNeeded', value)}>
                  <SelectTrigger className="border-emerald-200 focus:border-emerald-400">
                    <SelectValue placeholder="How much time can you dedicate?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 minutes">30 minutes</SelectItem>
                    <SelectItem value="1 hour">1 hour</SelectItem>
                    <SelectItem value="2 hours">2 hours</SelectItem>
                    <SelectItem value="Half day">Half day</SelectItem>
                    <SelectItem value="Full day">Full day</SelectItem>
                    <SelectItem value="Multiple days">Multiple days</SelectItem>
                    <SelectItem value="Flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="locality">Locality *</Label>
                <Select value={formData.locality} onValueChange={(value) => handleInputChange('locality', value)}>
                  <SelectTrigger className="border-emerald-200 focus:border-emerald-400">
                    <SelectValue placeholder="Select your locality" />
                  </SelectTrigger>
                  <SelectContent>
                    {BENGALURU_LOCALITIES.map((locality) => (
                      <SelectItem key={locality} value={locality}>
                        {locality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">💡 Examples of Help You Can Offer</h3>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Tech support and computer troubleshooting</li>
                  <li>• Moving furniture or heavy items</li>
                  <li>• Tutoring or teaching skills</li>
                  <li>• Pet sitting or walking</li>
                  <li>• Home repairs and maintenance</li>
                  <li>• Transportation assistance</li>
                </ul>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white"
                disabled={loading}
              >
                {loading ? 'Posting...' : 'Post Help Offer'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PostHelp;
