
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { toast } from '@/hooks/use-toast';
import { Mail, Phone, Loader } from 'lucide-react';

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

  // Debug log to see what image data we have
  React.useEffect(() => {
    if (post.type === 'clothes' && post.image) {
      console.log('Post image data:', post.image);
      console.log('Is base64:', post.image.startsWith('data:'));
    }
  }, [post.image, post.type]);

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
          {/* Image for clothes posts */}
          {post.type === 'clothes' && post.image && (
            <div className="rounded-lg overflow-hidden">
              {post.image.startsWith('data:') ? (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    console.log('Failed to load base64 image:', post.image?.substring(0, 50) + '...');
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500">Image not available</p>
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
              <p className="text-gray-600">{post.userEmail}</p>
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
