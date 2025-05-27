
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Menu, X } from 'lucide-react';

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "Come back soon!",
      });
      navigate('/');
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-b border-emerald-100 z-50">
          <div className="flex flex-col space-y-2 p-4">
            {user ? (
              <>
                <Link to="/dashboard" onClick={closeMenu}>
                  <Button variant="ghost" className="w-full justify-start text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50">
                    Dashboard
                  </Button>
                </Link>
                <Link to="/profile" onClick={closeMenu}>
                  <Button variant="ghost" className="w-full justify-start text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50">
                    My Profile
                  </Button>
                </Link>
                <Link to="/about" onClick={closeMenu}>
                  <Button variant="ghost" className="w-full justify-start text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50">
                    About Us
                  </Button>
                </Link>
                <Link to="/contact" onClick={closeMenu}>
                  <Button variant="ghost" className="w-full justify-start text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50">
                    Contact Us
                  </Button>
                </Link>
                <Button 
                  onClick={handleSignOut}
                  variant="outline" 
                  className="w-full justify-start border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/about" onClick={closeMenu}>
                  <Button variant="ghost" className="w-full justify-start text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50">
                    About Us
                  </Button>
                </Link>
                <Link to="/contact" onClick={closeMenu}>
                  <Button variant="ghost" className="w-full justify-start text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50">
                    Contact Us
                  </Button>
                </Link>
                <Link to="/login" onClick={closeMenu}>
                  <Button variant="ghost" className="w-full justify-start text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={closeMenu}>
                  <Button className="w-full justify-start bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
