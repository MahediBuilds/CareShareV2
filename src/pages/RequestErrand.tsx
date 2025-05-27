
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

const RequestErrand = () => {
  const { user } = useAuth();
  const { addPost } = useData();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    locality: '',
    items: [] as string[],
    newItem: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to request errands",
        variant: "destructive",
      });
      return;
    }

    if (formData.items.length === 0) {
      toast({
        title: "Add items",
        description: "Please add at least one item to your errand list",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      addPost({
        type: 'errand',
        title: formData.title,
        description: formData.description,
        locality: formData.locality,
        userId: user.id,
        userEmail: user.email || '',
        items: formData.items,
      });

      toast({
        title: "Errand request posted!",
        description: "Your errand request has been shared with the community.",
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post errand request",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addItem = () => {
    if (formData.newItem.trim()) {
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, prev.newItem.trim()],
        newItem: '',
      }));
    }
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="text-center p-8">
            <CardContent>
              <h2 className="text-2xl font-bold mb-4">Please Login</h2>
              <p className="text-gray-600 mb-4">You need to be logged in to request errands</p>
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
              🛒 Request Errand
            </CardTitle>
            <p className="text-gray-600">Ask neighbors to help with your shopping or errands</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Errand Title *</Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Grocery Shopping, Medicine Pickup"
                  required
                  className="border-emerald-200 focus:border-emerald-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Additional Notes</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Any special instructions, urgency, payment details..."
                  className="border-emerald-200 focus:border-emerald-400 min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Shopping List *</Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.newItem}
                    onChange={(e) => handleInputChange('newItem', e.target.value)}
                    placeholder="Add item to list"
                    className="border-emerald-200 focus:border-emerald-400"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())}
                  />
                  <Button type="button" onClick={addItem} variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                    Add
                  </Button>
                </div>
                
                {formData.items.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Items ({formData.items.length}):</p>
                    <div className="space-y-2">
                      {formData.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-emerald-50 p-2 rounded border border-emerald-200">
                          <span className="text-emerald-800">{item}</span>
                          <Button
                            type="button"
                            onClick={() => removeItem(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-orange-800 mb-2">💡 Tips for Errand Requests</h3>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Be specific about quantities and brands</li>
                  <li>• Mention any substitution preferences</li>
                  <li>• Offer to reimburse for expenses upfront</li>
                  <li>• Be available to receive the items promptly</li>
                </ul>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white"
                disabled={loading}
              >
                {loading ? 'Posting...' : 'Post Errand Request'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RequestErrand;
