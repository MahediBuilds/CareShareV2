import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { toast } from '@/hooks/use-toast';
import { Mail, Phone, Loader, ChevronLeft, ChevronRight } from 'lucide-react';
import PostDetailDialog from './PostDetailDialog';

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
  image?: string;
  images?: string[];
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useAuth();
  const { claimPost } = useData();
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showClaimSuccessDialog, setShowClaimSuccessDialog] = useState(false);

  // Get images array - prioritize new images field, fallback to single image for backward compatibility
  const displayImages = post.images && post.images.length > 0 ? post.images : (post.image ? [post.image] : []);

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

  const handleClaimConfirm = async () => {
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

    setIsLoading(true);

    // Show loading for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));

    claimPost(post.id, user.id);
    setIsLoading(false);
    setShowClaimSuccessDialog(true);
    
    toast({
      title: "Successfully claimed!",
      description: `You have claimed this ${post.type}. You can now contact the owner.`,
    });
  };

  const handleContactOwner = () => {
    const subject = `Regarding your ${post.type}: ${post.title}`;
    const body = `Hi,

I saw your post about "${post.title}" on CareShare and I'm interested.

Post Details:
- Type: ${post.type}
- Location: ${post.locality}
- Description: ${post.description}

Please let me know how we can arrange the pickup/delivery.

Best regards,
${user?.user_metadata?.full_name || user?.email || 'CareShare User'}`;

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const mailtoUrl = `mailto:${post.userEmail}?subject=${encodedSubject}&body=${encodedBody}`;
    
    console.log('Opening mailto URL:', mailtoUrl);
    
    // Try multiple methods to ensure it works across different browsers/devices
    try {
      window.location.href = mailtoUrl;
    } catch (error) {
      console.error('Failed to open mailto URL:', error);
      // Fallback: copy email to clipboard and show toast
      navigator.clipboard.writeText(post.userEmail).then(() => {
        toast({
          title: "Email copied!",
          description: `Email address ${post.userEmail} has been copied to clipboard.`,
        });
      }).catch(() => {
        toast({
          title: "Email address",
          description: `Please contact: ${post.userEmail}`,
        });
      });
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const ContactDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-2">
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
          {user?.user_metadata?.phone && (
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-600">{user.user_metadata.phone}</p>
              </div>
            </div>
          )}
          <div className="bg-emerald-50 p-3 rounded-lg">
            <p className="text-sm text-emerald-800">
              <strong>About this {post.type}:</strong> {post.title}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const isClaimedByCurrentUser = post.claimed && post.claimedBy === user?.id;

  const CardContent_Component = (
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
        {/* Image Slideshow for all posts with images */}
        {displayImages.length > 0 && (
          <div className="relative rounded-lg overflow-hidden mb-3">
            {displayImages.length === 1 ? (
              // Single image display
              displayImages[0].startsWith('data:') ? (
                <img
                  src={displayImages[0]}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    console.log('Failed to load image:', displayImages[0]?.substring(0, 50) + '...');
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Image not available</p>
                </div>
              )
            ) : (
              // Multiple images with navigation
              <div className="relative">
                {displayImages[currentImageIndex].startsWith('data:') ? (
                  <img
                    src={displayImages[currentImageIndex]}
                    alt={`${post.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      console.log('Failed to load image:', displayImages[currentImageIndex]?.substring(0, 50) + '...');
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">Image not available</p>
                  </div>
                )}
                
                {/* Navigation buttons */}
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white h-8 w-8 p-0"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white h-8 w-8 p-0"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                
                {/* Image counter */}
                <div className="absolute bottom-1 right-1 bg-black/60 text-white px-2 py-1 rounded text-xs">
                  {currentImageIndex + 1}/{displayImages.length}
                </div>
                
                {/* Thumbnail dots */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {displayImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

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
      
      <CardFooter className="flex flex-col space-y-2">
        {post.claimed ? (
          <div className="w-full">
            <Badge variant="secondary" className="w-full justify-center py-2 mb-2">
              Already Claimed
            </Badge>
            {isClaimedByCurrentUser && <ContactDialog />}
          </div>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                className="w-full bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Claiming...
                  </>
                ) : (
                  post.type === 'errand' && post.payment ? 'Accept Errand' : 'Claim'
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Claim</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to claim this {post.type}? Once claimed, you'll be able to contact the owner and coordinate the pickup/delivery.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClaimConfirm}>
                  Yes, Claim It
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>

      {/* Claim Success Dialog */}
      <Dialog open={showClaimSuccessDialog} onOpenChange={setShowClaimSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-green-600">🎉 Successfully Claimed!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-center">
            <p className="text-gray-600">
              You have successfully claimed "{post.title}". Now you can contact the owner to arrange pickup/delivery.
            </p>
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h3 className="font-semibold text-emerald-800 mb-2">Next Steps:</h3>
              <ul className="text-sm text-emerald-700 space-y-1 text-left">
                <li>• Contact the owner using the button below</li>
                <li>• Arrange a convenient pickup/delivery time</li>
                <li>• Coordinate the meeting location</li>
                <li>• Complete the exchange safely</li>
              </ul>
            </div>
            <Button 
              onClick={handleContactOwner}
              className="w-full bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Owner
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowClaimSuccessDialog(false)}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );

  // Wrap in PostDetailDialog to make cards clickable for detailed view
  return (
    <PostDetailDialog post={post}>
      <div className="cursor-pointer">
        {CardContent_Component}
      </div>
    </PostDetailDialog>
  );
};

export default PostCard;
