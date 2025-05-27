
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
    payment: '',
    paymentType: 'fixed' as 'fixed' | 'negotiable',
    currency: 'INR',
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

    if (!formData.payment || parseFloat(formData.payment) <= 0) {
      toast({
        title: "Payment required",
        description: "Please specify a valid payment amount for this errand",
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
        payment: parseFloat(formData.payment),
        paymentType: formData.paymentType,
        currency: formData.currency,
      });

      toast({
        title: "Paid errand posted!",
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

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="text-center p-8">
            <CardContent>
              <h2 className="text-2xl font-bold mb-4">Please Login</h2>
              <p className="text-gray-600 mb-4">You need to be logged in to request paid errands</p>
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
              💰 Request Paid Errand
            </CardTitle>
            <p className="text-gray-600">Post a task and offer payment to community helpers</p>
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
                  placeholder="e.g., Grocery Shopping, Document Pickup, Pet Walking, House Cleaning"
                  required
                  className="border-emerald-200 focus:border-emerald-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the task in detail: what needs to be done, when, any special requirements, time estimate..."
                  required
                  className="border-emerald-200 focus:border-emerald-400 min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payment">Payment Amount *</Label>
                  <div className="flex gap-2">
                    <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                      <SelectTrigger className="w-20 border-emerald-200 focus:border-emerald-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">₹</SelectItem>
                        <SelectItem value="USD">$</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="payment"
                      type="number"
                      min="1"
                      value={formData.payment}
                      onChange={(e) => handleInputChange('payment', e.target.value)}
                      placeholder="500"
                      required
                      className="border-emerald-200 focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Payment Type *</Label>
                  <Select value={formData.paymentType} onValueChange={(value: 'fixed' | 'negotiable') => handleInputChange('paymentType', value)}>
                    <SelectTrigger className="border-emerald-200 focus:border-emerald-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                      <SelectItem value="negotiable">Negotiable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                <h3 className="font-semibold text-orange-800 mb-2">💡 Tips for Paid Errands</h3>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Be clear about the task requirements and timeline</li>
                  <li>• Offer fair payment based on time and effort required</li>
                  <li>• Specify if any special skills or equipment are needed</li>
                  <li>• Be available to communicate with potential helpers</li>
                  <li>• Consider payment method (cash, UPI, etc.) beforehand</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">🎯 Popular Errand Types</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-blue-700">
                  <div>• Grocery shopping</div>
                  <div>• Document pickup/delivery</div>
                  <div>• House cleaning</div>
                  <div>• Pet care/walking</div>
                  <div>• Appliance repair coordination</div>
                  <div>• Queue standing</div>
                  <div>• Event setup help</div>
                  <div>• Moving assistance</div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white"
                disabled={loading}
              >
                {loading ? 'Posting...' : 'Post Paid Errand'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RequestErrand;
