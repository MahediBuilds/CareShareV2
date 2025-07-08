
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Mail, Phone } from 'lucide-react';

interface Post {
  id: string;
  type: 'food' | 'clothes' | 'help' | 'errand';
  title: string;
  description: string;
  locality: string;
  userId: string;
  userEmail: string;
  createdAt: Date;
  claimedBy?: string;
  claimed?: boolean;
  expiry?: Date;
  size?: string;
  category?: string;
  timeNeeded?: string;
  items?: string[];
  payment?: number;
  paymentType?: 'fixed' | 'negotiable';
  currency?: string;
}

interface ClaimedPostCardProps {
  post: Post;
  ownerPhone?: string;
}

const ClaimedPostCard: React.FC<ClaimedPostCardProps> = ({ post, ownerPhone }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'food': return 'bg-green-100 text-green-800';
      case 'clothes': return 'bg-blue-100 text-blue-800';
      case 'help': return 'bg-purple-100 text-purple-800';
      case 'errand': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeUntilExpiry = (expiry: Date) => {
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diff <= 0) return 'Expired';
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  const formatPayment = (amount: number, currency: string = 'INR', paymentType: string = 'fixed') => {
    const symbol = currency === 'USD' ? '$' : '₹';
    const typeText = paymentType === 'negotiable' ? ' (negotiable)' : '';
    return `${symbol}${amount}${typeText}`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-emerald-100">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-2">
            {post.title}
          </CardTitle>
          <Badge className={getTypeColor(post.type)}>
            {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-gray-600 text-sm line-clamp-3">{post.description}</p>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            📍 {post.locality}
          </Badge>
          
          {post.expiry && (
            <Badge 
              variant="outline" 
              className={`text-xs ${
                new Date(post.expiry).getTime() - new Date().getTime() <= 3600000 
                  ? 'border-red-300 text-red-700 bg-red-50' 
                  : 'border-green-300 text-green-700 bg-green-50'
              }`}
            >
              ⏰ {getTimeUntilExpiry(new Date(post.expiry))}
            </Badge>
          )}
          
          {post.size && (
            <Badge variant="outline" className="text-xs">
              👕 Size {post.size}
            </Badge>
          )}
          
          {post.category && (
            <Badge variant="outline" className="text-xs">
              {post.category}
            </Badge>
          )}
          
          {post.timeNeeded && (
            <Badge variant="outline" className="text-xs">
              ⏱️ {post.timeNeeded}
            </Badge>
          )}

          {post.payment && (
            <Badge variant="outline" className="text-xs bg-green-50 border-green-300 text-green-700 font-semibold">
              💰 {formatPayment(post.payment, post.currency, post.paymentType)}
            </Badge>
          )}
        </div>

        {post.items && post.items.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-gray-500 mb-1">Items needed:</p>
            <div className="text-xs text-gray-700">
              {post.items.join(', ')}
            </div>
          </div>
        )}
        
        <p className="text-xs text-gray-500">
          Posted by: {post.userEmail} • {new Date(post.createdAt).toLocaleDateString()}
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              <Mail className="w-4 h-4 mr-2" />
              Contact Owner
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Contact Information</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">{post.userEmail}</p>
                </div>
              </div>
              {ownerPhone && (
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">{ownerPhone}</p>
                  </div>
                </div>
              )}
              <div className="bg-emerald-50 p-3 rounded-lg">
                <p className="text-sm text-emerald-800">
                  <strong>About this {post.type}:</strong> {post.title}
                </p>
                <p className="text-sm text-emerald-700 mt-1">
                  Location: {post.locality}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ClaimedPostCard;
