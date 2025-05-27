
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { toast } from '@/hooks/use-toast';

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

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useAuth();
  const { claimPost } = useData();

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

  const handleClaim = () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to claim items",
        variant: "destructive",
      });
      return;
    }

    if (post.userId === user.id) {
      toast({
        title: "Cannot claim",
        description: "You cannot claim your own post",
        variant: "destructive",
      });
      return;
    }

    claimPost(post.id, user.id);
    toast({
      title: "Successfully claimed!",
      description: `You have claimed this ${post.type}. Contact ${post.userEmail} for details.`,
    });
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 border-emerald-100">
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
      </CardContent>
      
      <CardFooter>
        {post.claimed ? (
          <Badge variant="secondary" className="w-full justify-center py-2">
            Already Claimed
          </Badge>
        ) : (
          <Button 
            onClick={handleClaim}
            className="w-full bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white"
          >
            {post.type === 'errand' && post.payment ? 'Accept Errand' : 'Claim'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
