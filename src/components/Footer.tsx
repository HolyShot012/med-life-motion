import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Heart 
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (footerRef.current && socialLinksRef.current) {
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            end: "bottom center",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate social icons on hover
      const socialIcons = socialLinksRef.current.children;
      Array.from(socialIcons).forEach((icon) => {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, { 
            scale: 1.2, 
            rotation: 10, 
            duration: 0.3, 
            ease: "power2.out" 
          });
        });
        
        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, { 
            scale: 1, 
            rotation: 0, 
            duration: 0.3, 
            ease: "power2.out" 
          });
        });
      });
    }
  }, []);

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
  ];

  const services = [
    'Prescription Services',
    'Health Consultations',
    'Vaccination Programs',
    'Medicine Delivery',
    'Health Monitoring',
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
  ];

  return (
    <footer ref={footerRef} className="bg-muted mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                MedLife Pharmacy
              </span>
            </div>
            <p className="text-muted-foreground">
              Your trusted healthcare partner, providing quality medicines and 
              professional care for your family's wellbeing.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>123 Healthcare Ave, Medical District</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>info@medlifepharmacy.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="text-muted-foreground">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Subscribe to our newsletter for health tips and special offers.
            </p>
            <div className="space-y-2">
              <Input 
                type="email"
                placeholder="Enter your email"
                className="focus:ring-2 focus:ring-primary/20 transition-smooth"
              />
              <Button className="w-full btn-medical">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>© 2024 MedLife Pharmacy. Made with</span>
            <Heart className="w-4 h-4 text-destructive fill-current" />
            <span>for your health</span>
          </div>

          {/* Social Links */}
          <div ref={socialLinksRef} className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                variant="ghost"
                size="icon"
                asChild
                className="hover:bg-primary/10 transition-smooth"
              >
                <a href={social.href} aria-label={social.name}>
                  <social.icon className="w-4 h-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};