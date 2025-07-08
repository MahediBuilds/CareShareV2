import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { toast } from '@/hooks/use-toast';
import { Mail, Phone, Loader, ChevronLeft, ChevronRight } from 'lucide-react';

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

interface PostDetailDialogProps {
  post: Post;
  children: React.ReactNode;
}

const PostDetailDialog: React.FC<PostDetailDialogProps> = ({ post, children }) => {
  const { user } = useAuth();
  const { claimPost } = useData();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showContactInfo, setShowContactInfo] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  // Get images array - prioritize new images field, fallback to single image for backward compatibility
  const displayImages = post.images && post.images.length > 0 ? post.images : (post.image ? [post.image] : []);

  // Debug log to see what image data we have
  React.useEffect(() => {
    if (post.type === 'clothes' && displayImages.length > 0) {
      console.log('Post images data:', displayImages);
      console.log('Number of images:', displayImages.length);
    }
  }, [displayImages, post.type]);

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
    setShowContactInfo(true);
    setIsLoading(false);
    
    toast({
      title: "Successfully claimed!",
      description: `You have claimed this ${post.type}. Contact information is now available.`,
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const handleEmailClick = (email: string) => {
    try {
      const subject = encodeURIComponent(`Regarding: ${post.title}`);
      const body = encodeURIComponent(`Hi,\n\nI'm interested in your ${post.type} post "${post.title}" on CareShare.\n\nBest regards`);
      const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
      
      window.location.href = mailtoUrl;
    } catch (error) {
      console.error('Error opening mail app:', error);
      // Fallback: copy email to clipboard
      navigator.clipboard.writeText(email).then(() => {
        toast({
          title: "Email copied to clipboard",
          description: `${email} has been copied to your clipboard`,
        });
      }).catch(() => {
        toast({
          title: "Email address",
          description: email,
        });
      });
    }
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
              <button 
                onClick={() => handleEmailClick(post.userEmail)}
                className="text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer transition-colors"
              >
                {post.userEmail}
              </button>
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            {post.title}
            <Badge className={`ml-2 ${
              post.type === 'food' ? 'bg-green-100 text-green-800' :
              post.type === 'clothes' ? 'bg-blue-100 text-blue-800' :
              post.type === 'help' ? 'bg-purple-100 text-purple-800' :
              'bg-orange-100 text-orange-800'
            }`}>
              {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Images for clothes posts */}
          {post.type === 'clothes' && displayImages.length > 0 && (
            <div className="rounded-lg overflow-hidden">
              {displayImages.length === 1 ? (
                // Single image display
                displayImages[0].startsWith('data:') ? (
                  <img
                    src={displayImages[0]}
                    alt={post.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      console.log('Failed to load image:', displayImages[0]?.substring(0, 50) + '...');
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-500">Image not available</p>
                  </div>
                )
              ) : (
                // Multiple images with navigation
                <div className="relative">
                  {displayImages[currentImageIndex].startsWith('data:') ? (
                    <img
                      src={displayImages[currentImageIndex]}
                      alt={`${post.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        console.log('Failed to load image:', displayImages[currentImageIndex]?.substring(0, 50) + '...');
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                      <p className="text-gray-500">Image not available</p>
                    </div>
                  )}
                  
                  {/* Navigation buttons */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  
                  {/* Image counter */}
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {currentImageIndex + 1} / {displayImages.length}
                  </div>
                  
                  {/* Thumbnail dots */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {displayImages.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
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

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600">{post.description}</p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-1">Location</h4>
              <p className="text-gray-600">{post.locality}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-1">Posted by</h4>
              <button 
                onClick={() => handleEmailClick(post.userEmail)}
                className="text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer transition-colors text-left"
              >
                {post.userEmail}
              </button>
            </div>
            {post.size && (
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Size</h4>
                <p className="text-gray-600">{post.size}</p>
              </div>
            )}
            {post.category && (
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Category</h4>
                <p className="text-gray-600">{post.category}</p>
              </div>
            )}
            {post.expiry && (
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Expires in</h4>
                <p className={`${
                  new Date(post.expiry).getTime() - new Date().getTime() <= 3600000 
                    ? 'text-red-600 font-semibold' 
                    : 'text-green-600'
                }`}>
                  {getTimeUntilExpiry(new Date(post.expiry))}
                </p>
              </div>
            )}
            {post.payment && (
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Payment</h4>
                <p className="text-green-600 font-semibold">
                  {formatPayment(post.payment, post.currency, post.paymentType)}
                </p>
              </div>
            )}
          </div>

          {post.items && post.items.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Items needed</h4>
              <div className="flex flex-wrap gap-2">
                {post.items.map((item, index) => (
                  <Badge key={index} variant="outline">{item}</Badge>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="font-medium text-gray-700 mb-1">Posted on</h4>
            <p className="text-gray-600">{new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>

          {/* Claim Button */}
          <div className="pt-4 border-t">
            {post.claimed ? (
              <div>
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailDialog;
