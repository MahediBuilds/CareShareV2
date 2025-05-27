
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

const DonateFood = () => {
  const { user } = useAuth();
  const { addPost } = useData();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    expiryHours: '6',
    locality: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to donate food",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + parseInt(formData.expiryHours));

    try {
      addPost({
        type: 'food',
        title: formData.title,
        description: formData.description,
        locality: formData.locality,
        userId: user.id,
        userEmail: user.email || '',
        expiry: expiryDate,
      });

      toast({
        title: "Food donation posted!",
        description: "Your food donation has been shared with the community.",
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post food donation",
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
              <p className="text-gray-600 mb-4">You need to be logged in to donate food</p>
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
              🍽️ Donate Food
            </CardTitle>
            <p className="text-gray-600">Share leftover food with those in need</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Food Title *</Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Homemade Rice and Dal"
                  required
                  className="border-emerald-200 focus:border-emerald-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the food, quantity, any special notes..."
                  required
                  className="border-emerald-200 focus:border-emerald-400 min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Time *</Label>
                <Select value={formData.expiryHours} onValueChange={(value) => handleInputChange('expiryHours', value)}>
                  <SelectTrigger className="border-emerald-200 focus:border-emerald-400">
                    <SelectValue placeholder="How long is this food good for?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                    <SelectItem value="6">6 hours</SelectItem>
                    <SelectItem value="8">8 hours</SelectItem>
                    <SelectItem value="12">12 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
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

              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                <h3 className="font-semibold text-emerald-800 mb-2">💡 Tips for Food Donation</h3>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• Ensure food is fresh and safe to consume</li>
                  <li>• Package food properly for transport</li>
                  <li>• Be responsive to messages from interested people</li>
                  <li>• Consider dietary restrictions and allergies</li>
                </ul>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white"
                disabled={loading}
              >
                {loading ? 'Posting...' : 'Post Food Donation'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DonateFood;
