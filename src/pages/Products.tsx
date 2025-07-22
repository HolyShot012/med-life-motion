import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Search, 
  Filter, 
  Heart, 
  Star, 
  ShoppingCart, 
  Eye,
  SlidersHorizontal,
  Grid3X3,
  List
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Products() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const productsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchRef.current && productsRef.current) {
      gsap.fromTo([searchRef.current, productsRef.current],
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.2, 
          ease: "power2.out" 
        }
      );
    }
  }, []);

  const categories = [
    { name: 'All Products', count: 1234 },
    { name: 'Pain Relief', count: 156 },
    { name: 'Vitamins & Supplements', count: 289 },
    { name: 'Cold & Flu', count: 123 },
    { name: 'First Aid', count: 67 },
    { name: 'Baby Care', count: 89 },
    { name: 'Skincare', count: 234 },
    { name: 'Digestive Health', count: 145 },
  ];

  const products = [
    {
      id: 1,
      name: 'Vitamin D3 1000IU Tablets',
      brand: 'HealthPlus',
      price: 12.99,
      originalPrice: 15.99,
      rating: 4.8,
      reviews: 234,
      inStock: true,
      delivery: 'Same day delivery',
      isPrescription: false,
      category: 'Vitamins',
      image: '/api/placeholder/300/300'
    },
    {
      id: 2,
      name: 'Omega-3 Fish Oil Capsules',
      brand: 'WellnessCore',
      price: 24.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 456,
      inStock: true,
      delivery: '2-4 days',
      isPrescription: false,
      category: 'Supplements',
      image: '/api/placeholder/300/300'
    },
    {
      id: 3,
      name: 'Ibuprofen 200mg Tablets',
      brand: 'PainRelief Pro',
      price: 8.99,
      originalPrice: 10.99,
      rating: 4.6,
      reviews: 189,
      inStock: false,
      delivery: '5-7 days',
      isPrescription: true,
      category: 'Pain Relief',
      image: '/api/placeholder/300/300'
    },
    {
      id: 4,
      name: 'Multivitamin Complete',
      brand: 'DailyHealth',
      price: 19.99,
      originalPrice: null,
      rating: 4.7,
      reviews: 567,
      inStock: true,
      delivery: 'Same day delivery',
      isPrescription: false,
      category: 'Vitamins',
      image: '/api/placeholder/300/300'
    },
    {
      id: 5,
      name: 'Cough Syrup Natural Honey',
      brand: 'NaturalCare',
      price: 14.99,
      originalPrice: 17.99,
      rating: 4.5,
      reviews: 123,
      inStock: true,
      delivery: '2-4 days',
      isPrescription: false,
      category: 'Cold & Flu',
      image: '/api/placeholder/300/300'
    },
    {
      id: 6,
      name: 'Probiotic Complex Capsules',
      brand: 'GutHealth',
      price: 29.99,
      originalPrice: null,
      rating: 4.8,
      reviews: 345,
      inStock: true,
      delivery: 'Same day delivery',
      isPrescription: false,
      category: 'Digestive Health',
      image: '/api/placeholder/300/300'
    },
  ];

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const ProductCard = ({ product }: { product: typeof products[0] }) => (
    <Card className="medical-card-hover group">
      <div className="relative aspect-square bg-muted rounded-t-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
        {product.originalPrice && (
          <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
            Save ${(product.originalPrice - product.price).toFixed(2)}
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => toggleFavorite(product.id)}
        >
          <Heart 
            className={`w-4 h-4 ${
              favorites.includes(product.id) 
                ? 'text-red-500 fill-current' 
                : 'text-muted-foreground'
            }`} 
          />
        </Button>
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" size="icon">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <Badge variant="outline" className="text-xs">
            {product.brand}
          </Badge>
          <h3 className="font-semibold text-sm leading-tight">{product.name}</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews})
          </span>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{product.delivery}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge 
            variant={product.inStock ? 'secondary' : 'destructive'}
            className="text-xs"
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </Badge>
          {product.isPrescription && (
            <Badge variant="outline" className="text-xs">
              Rx Required
            </Badge>
          )}
        </div>
        
        <Button 
          className="w-full btn-medical text-sm" 
          disabled={!product.inStock}
        >
          <ShoppingCart className="w-3 h-3 mr-1" />
          {product.inStock ? 'Add to Cart' : 'Notify Me'}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Products</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our extensive collection of medicines, supplements, and health products
          </p>
        </div>

        {/* Search and Filters */}
        <div ref={searchRef} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                type="text"
                placeholder="Search products..."
                className="pl-10 h-12"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Filter products by your preferences
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Price Range</h4>
                      <div className="space-y-2">
                        <Input placeholder="Min price" type="number" />
                        <Input placeholder="Max price" type="number" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Brand</h4>
                      <div className="space-y-2">
                        {['HealthPlus', 'WellnessCore', 'PainRelief Pro', 'DailyHealth'].map(brand => (
                          <label key={brand} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">{brand}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none rounded-l-md"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="rounded-none rounded-r-md"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Categories Sidebar */}
          <div className="lg:w-64 space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Categories</h3>
                <Tabs defaultValue="all" orientation="vertical" className="w-full">
                  <TabsList className="flex flex-col h-auto space-y-1 bg-transparent">
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category.name}
                        value={category.name.toLowerCase().replace(/\s+/g, '-')}
                        className="w-full justify-between data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        <span>{category.name}</span>
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {category.count}
                        </Badge>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div ref={productsRef} className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {products.length} of 1,234 products
              </p>
            </div>
            
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}