import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import pharmacyHero from '@/assets/pharmacy-hero.jpg';
import { 
  Search, 
  Upload, 
  QrCode, 
  Heart, 
  Bell, 
  MapPin,
  Star,
  ShoppingCart,
  Clock,
  Shield,
  Phone,
  Calendar,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const userProfileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero Animation
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "power2.out" 
        }
      );
    }

    // Scroll-triggered animations
    const elements = [userProfileRef, searchRef, servicesRef, categoriesRef];
    elements.forEach((ref) => {
      if (ref.current) {
        gsap.fromTo(ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  }, []);

  const quickActions = [
    { 
      icon: Upload, 
      title: 'Upload Prescription', 
      description: 'Quick prescription upload',
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
    },
    { 
      icon: QrCode, 
      title: 'Scan QR Code', 
      description: 'Scan medicine QR codes',
      color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
    },
    { 
      icon: Heart, 
      title: 'Health Checkup', 
      description: 'Book health services',
      color: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
    },
    { 
      icon: Bell, 
      title: 'Reminders', 
      description: 'Set medicine reminders',
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300'
    },
  ];

  const categories = [
    { name: 'Pain Relief', count: 156, icon: '💊' },
    { name: 'Vitamins', count: 89, icon: '🍊' },
    { name: 'First Aid', count: 67, icon: '🩹' },
    { name: 'Baby Care', count: 45, icon: '👶' },
    { name: 'Skincare', count: 123, icon: '🧴' },
    { name: 'Supplements', count: 78, icon: '💪' },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Vitamin D3 1000IU',
      price: '$12.99',
      rating: 4.8,
      image: '/api/placeholder/200/200',
      inStock: true,
      delivery: '2-4 days'
    },
    {
      id: 2,
      name: 'Omega-3 Fish Oil',
      price: '$24.99',
      rating: 4.9,
      image: '/api/placeholder/200/200',
      inStock: true,
      delivery: 'Same day'
    },
    {
      id: 3,
      name: 'Multivitamin Complex',
      price: '$19.99',
      rating: 4.7,
      image: '/api/placeholder/200/200',
      inStock: false,
      delivery: '5-7 days'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={pharmacyHero} 
            alt="Modern pharmacy with professional pharmacists" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
        </div>
        <div className="relative container mx-auto px-4 py-24 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Your Health, Our Priority
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional pharmacy services with convenient online ordering, 
            fast delivery, and expert healthcare advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="btn-medical text-lg px-8">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Book Consultation
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 space-y-16 py-8">
        {/* User Profile Section */}
        <section ref={userProfileRef} className="space-y-6">
          <Card className="medical-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Welcome back, Sarah!</h2>
                    <p className="text-muted-foreground">Loyalty Member since 2022</p>
                  </div>
                </div>
                <Badge className="bg-secondary text-secondary-foreground text-lg px-4 py-2">
                  2,450 Points
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold">Recent Orders</h3>
                  <p className="text-sm text-muted-foreground">Last order: 3 days ago</p>
                  <Button variant="outline" size="sm">View All Orders</Button>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Prescriptions</h3>
                  <p className="text-sm text-muted-foreground">2 ready for refill</p>
                  <Button variant="outline" size="sm">Manage Prescriptions</Button>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Next Appointment</h3>
                  <p className="text-sm text-muted-foreground">Dec 15, 2024 at 2:00 PM</p>
                  <Button variant="outline" size="sm">Reschedule</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Enhanced Search Section */}
        <section ref={searchRef} className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Find What You Need</h2>
            <p className="text-muted-foreground">Search our extensive catalog of medicines and health products</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                type="text"
                placeholder="Search medicines, vitamins, or health products..."
                className="search-enhanced pl-12 pr-12 h-14 text-lg"
              />
              <Button 
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-medical"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section ref={servicesRef} className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="medical-card-hover cursor-pointer group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-full ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section ref={categoriesRef} className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground">Browse our organized product categories</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="medical-card-hover cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{category.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count} products</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground">Popular items from our pharmacy</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="medical-card-hover">
                <div className="aspect-square bg-muted rounded-t-lg"></div>
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">({product.rating})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                    <Badge variant={product.inStock ? 'secondary' : 'destructive'}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{product.delivery}</span>
                  </div>
                  
                  <Button className="w-full btn-medical" disabled={!product.inStock}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.inStock ? 'Add to Cart' : 'Notify When Available'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Health Services */}
        <section className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Health Services</h2>
            <p className="text-muted-foreground">Professional healthcare services at your convenience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="medical-card-hover">
              <CardContent className="p-6 text-center space-y-4">
                <Shield className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-xl font-semibold">Vaccination Services</h3>
                <p className="text-muted-foreground">Get your flu shots, COVID boosters, and travel vaccines</p>
                <Button className="btn-medical">Book Appointment</Button>
              </CardContent>
            </Card>
            
            <Card className="medical-card-hover">
              <CardContent className="p-6 text-center space-y-4">
                <Phone className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-xl font-semibold">Teleconsultation</h3>
                <p className="text-muted-foreground">Consult with our pharmacists from the comfort of your home</p>
                <Button className="btn-medical">Start Consultation</Button>
              </CardContent>
            </Card>
            
            <Card className="medical-card-hover">
              <CardContent className="p-6 text-center space-y-4">
                <Calendar className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-xl font-semibold">Health Monitoring</h3>
                <p className="text-muted-foreground">Track your health metrics and medication adherence</p>
                <Button className="btn-medical">Learn More</Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}