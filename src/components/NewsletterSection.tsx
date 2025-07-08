
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    
    // Simulate newsletter signup
    setTimeout(() => {
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our community updates and impact stories.",
      });
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-r from-emerald-500 to-orange-500 border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Connected
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Get weekly updates on community impact, success stories, and new features. 
              Join our newsletter and be part of the caring community!
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/90 border-white/20 placeholder:text-gray-600"
                required
              />
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold px-8"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            
            <p className="text-sm text-emerald-200 mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsletterSection;
