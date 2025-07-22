import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Shield, 
  Sun, 
  Moon, 
  Menu, 
  X,
  Globe,
  Search,
  Bell,
  User
} from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from './ThemeProvider';
import { Badge } from './ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const themeIconRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Cart', path: '/cart', icon: ShoppingCart, badge: 3 },
    { name: 'Vaccines', path: '/vaccines', icon: Shield },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
  ];

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        rotation: 360,
        duration: 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    if (themeIconRef.current) {
      gsap.to(themeIconRef.current, {
        rotationY: 180,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          setTheme(newTheme);
          gsap.to(themeIconRef.current, {
            rotationY: 0,
            duration: 0.5,
            ease: "power2.inOut",
          });
        }
      });
    } else {
      setTheme(newTheme);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div 
            ref={logoRef}
            className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center"
          >
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
            MedLife
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-4 py-2 rounded-lg transition-smooth flex items-center space-x-2 group ${
                isActive(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
              {item.badge && (
                <Badge className="ml-1 bg-secondary text-secondary-foreground">
                  {item.badge}
                </Badge>
              )}
              {isActive(item.path) && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-glow rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="w-4 h-4" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-4 h-4" />
            <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-destructive" />
          </Button>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={language === lang.code ? 'bg-accent' : ''}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="relative overflow-hidden"
          >
            <div ref={themeIconRef} className="flex items-center justify-center">
              {theme === 'light' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </div>
          </Button>

          {/* User Profile */}
          <Button variant="ghost" size="icon">
            <User className="w-4 h-4" />
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
                {item.badge && (
                  <Badge className="ml-auto bg-secondary text-secondary-foreground">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};