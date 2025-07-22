import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Minus, 
  Plus, 
  Trash2, 
  Heart, 
  MapPin, 
  Truck, 
  CreditCard,
  Gift,
  ShoppingBag,
  ArrowRight,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Vitamin D3 1000IU Tablets',
      brand: 'HealthPlus',
      price: 12.99,
      quantity: 2,
      image: '/api/placeholder/100/100',
      delivery: 'Same day delivery',
      inStock: true
    },
    {
      id: 2,
      name: 'Omega-3 Fish Oil Capsules',
      brand: 'WellnessCore',
      price: 24.99,
      quantity: 1,
      image: '/api/placeholder/100/100',
      delivery: '2-4 days',
      inStock: true
    },
    {
      id: 3,
      name: 'Multivitamin Complete',
      brand: 'DailyHealth',
      price: 19.99,
      quantity: 1,
      image: '/api/placeholder/100/100',
      delivery: 'Same day delivery',
      inStock: true
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const cartRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cartRef.current && summaryRef.current && progressRef.current) {
      gsap.fromTo([progressRef.current, cartRef.current, summaryRef.current],
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

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'HEALTH20') {
      setIsPromoApplied(true);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = isPromoApplied ? subtotal * 0.2 : 0;
  const tax = (subtotal - discount) * 0.08;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal - discount + tax + shipping;

  const loyaltyPoints = Math.floor(total * 10);

  const steps = [
    { number: 1, title: 'Cart', description: 'Review items' },
    { number: 2, title: 'Address', description: 'Delivery details' },
    { number: 3, title: 'Payment', description: 'Payment method' },
    { number: 4, title: 'Confirmation', description: 'Order confirmed' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground">
            Review your items and proceed to checkout
          </p>
        </div>

        {/* Progress Bar */}
        <div ref={progressRef} className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center space-y-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step.number 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div ref={cartRef} className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Your Items ({cartItems.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 space-y-4">
                    <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/50" />
                    <div>
                      <h3 className="text-lg font-semibold">Your cart is empty</h3>
                      <p className="text-muted-foreground">Add some products to get started</p>
                    </div>
                    <Button className="btn-medical">
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0"></div>
                      
                      <div className="flex-1 space-y-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        <div className="flex items-center space-x-2">
                          <Truck className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{item.delivery}</span>
                        </div>
                        <Badge variant={item.inStock ? 'secondary' : 'destructive'} className="text-xs">
                          {item.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="h-8 w-8"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="text-right space-y-2">
                        <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Promo Code */}
            {cartItems.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={applyPromoCode}
                      disabled={isPromoApplied}
                      variant={isPromoApplied ? 'secondary' : 'default'}
                    >
                      {isPromoApplied ? 'Applied!' : 'Apply'}
                    </Button>
                  </div>
                  {isPromoApplied && (
                    <div className="mt-2 flex items-center space-x-2 text-green-600">
                      <Check className="w-4 h-4" />
                      <span className="text-sm">20% discount applied!</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div ref={summaryRef} className="space-y-4">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (20%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Gift className="w-4 h-4" />
                      <span>You'll earn {loyaltyPoints} loyalty points</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>Deliver to: 123 Main St, City</span>
                      <Button variant="link" size="sm" className="p-0 h-auto">
                        Change
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">Delivery Options</h4>
                      <div className="space-y-1">
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="delivery" defaultChecked />
                          <span className="text-sm">Standard Delivery (FREE) - 2-4 days</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="delivery" />
                          <span className="text-sm">Express Delivery ($9.99) - Same day</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full btn-medical text-lg py-6"
                    onClick={() => setCurrentStep(2)}
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                      <CreditCard className="w-4 h-4" />
                      <span>Secure checkout with 256-bit SSL encryption</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}