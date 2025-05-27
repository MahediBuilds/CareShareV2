
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
import { BENGALURU_LOCALITIES, CLOTHING_CATEGORIES, CLOTHING_SIZES } from '@/lib/constants';

const DonateClothes = () => {
  const { user } = useAuth();
  const { addPost } = useData();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    size: '',
    category: '',
    locality: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to donate clothes",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      addPost({
        type: 'clothes',
        title: formData.title,
        description: formData.description,
        locality: formData.locality,
        userId: user.id,
        userEmail: user.email || '',
        size: formData.size,
        category: formData.category,
      });

      toast({
        title: "Clothes donation posted!",
        description: "Your clothes donation has been shared with the community.",
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post clothes donation",
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
              <p className="text-gray-600 mb-4">You need to be logged in to donate clothes</p>
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
              👕 Donate Clothes
            </CardTitle>
            <p className="text-gray-600">Share clothes you no longer need</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Clothing Title *</Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Cotton T-shirts, Formal Shirts"
                  required
                  className="border-emerald-200 focus:border-emerald-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="border-emerald-200 focus:border-emerald-400">
                    <SelectValue placeholder="Select clothing category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CLOTHING_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Size *</Label>
                <Select value={formData.size} onValueChange={(value) => handleInputChange('size', value)}>
                  <SelectTrigger className="border-emerald-200 focus:border-emerald-400">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {CLOTHING_SIZES.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the condition, color, brand, quantity..."
                  required
                  className="border-emerald-200 focus:border-emerald-400 min-h-[100px]"
                />
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

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">💡 Tips for Clothes Donation</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Ensure clothes are clean and in good condition</li>
                  <li>• Be honest about any wear and tear</li>
                  <li>• Include quantity if donating multiple items</li>
                  <li>• Consider seasonal appropriateness</li>
                </ul>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white"
                disabled={loading}
              >
                {loading ? 'Posting...' : 'Post Clothes Donation'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DonateClothes;
