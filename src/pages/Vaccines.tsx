import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Shield, 
  FileText, 
  Download,
  ChevronDown,
  ChevronUp,
  Check,
  AlertCircle,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Vaccines() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const vaccinesRef = useRef<HTMLDivElement>(null);
  const recordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [headerRef, bookingRef, vaccinesRef, recordsRef];
    elements.forEach((ref, index) => {
      if (ref.current) {
        gsap.fromTo(ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out"
          }
        );
      }
    });
  }, []);

  const locations = [
    { 
      id: 1, 
      name: 'MedLife Pharmacy - Downtown', 
      address: '123 Main St, City Center',
      distance: '0.5 miles away',
      availability: 'Available today'
    },
    { 
      id: 2, 
      name: 'MedLife Pharmacy - Westside', 
      address: '456 West Ave, Westside',
      distance: '2.3 miles away',
      availability: 'Next available: Tomorrow'
    },
    { 
      id: 3, 
      name: 'MedLife Pharmacy - North', 
      address: '789 North Blvd, North District',
      distance: '4.1 miles away',
      availability: 'Available today'
    }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM'
  ];

  const vaccines = [
    {
      id: 1,
      name: 'COVID-19 Vaccine',
      description: 'mRNA vaccine for COVID-19 protection',
      price: 'Covered by insurance',
      nextShot: 'Booster available',
      effectiveness: '95%',
      duration: '6-8 months protection',
      sideEffects: 'Mild arm soreness, fatigue',
      category: 'Essential'
    },
    {
      id: 2,
      name: 'Influenza (Flu) Shot',
      description: 'Annual flu vaccination',
      price: '$25.00',
      nextShot: 'Annual (October recommended)',
      effectiveness: '60-70%',
      duration: '1 year protection',
      sideEffects: 'Mild arm soreness',
      category: 'Seasonal'
    },
    {
      id: 3,
      name: 'Hepatitis B',
      description: 'Hepatitis B virus prevention',
      price: '$45.00',
      nextShot: 'Series of 3 shots',
      effectiveness: '95%',
      duration: 'Lifetime protection',
      sideEffects: 'Mild arm soreness, fever',
      category: 'Travel'
    },
    {
      id: 4,
      name: 'Tdap (Tetanus)',
      description: 'Tetanus, Diphtheria, Pertussis',
      price: '$35.00',
      nextShot: 'Every 10 years',
      effectiveness: '98%',
      duration: '10 years protection',
      sideEffects: 'Arm soreness, mild fever',
      category: 'Essential'
    },
    {
      id: 5,
      name: 'Shingles (Zoster)',
      description: 'Shingles prevention for 50+',
      price: '$160.00',
      nextShot: 'Series of 2 shots',
      effectiveness: '90%',
      duration: '10+ years protection',
      sideEffects: 'Arm soreness, fatigue',
      category: 'Age-specific'
    },
    {
      id: 6,
      name: 'Pneumococcal',
      description: 'Pneumonia prevention',
      price: '$55.00',
      nextShot: 'Once after 65',
      effectiveness: '75%',
      duration: 'Long-term protection',
      sideEffects: 'Mild arm soreness',
      category: 'Age-specific'
    }
  ];

  const vaccinationRecords = [
    {
      id: 1,
      vaccine: 'COVID-19 (Pfizer)',
      date: '2024-01-15',
      location: 'MedLife Downtown',
      lotNumber: 'ABC123',
      nextDue: '2024-07-15'
    },
    {
      id: 2,
      vaccine: 'Influenza 2023',
      date: '2023-10-12',
      location: 'MedLife Westside',
      lotNumber: 'FLU456',
      nextDue: '2024-10-12'
    },
    {
      id: 3,
      vaccine: 'Tdap',
      date: '2022-03-20',
      location: 'MedLife Downtown',
      lotNumber: 'TET789',
      nextDue: '2032-03-20'
    }
  ];

  const faqs = [
    {
      id: 'insurance',
      question: 'Does insurance cover vaccinations?',
      answer: 'Most insurance plans cover recommended vaccines at 100%. We accept all major insurance providers and can verify your coverage before your appointment.'
    },
    {
      id: 'walk-in',
      question: 'Do you accept walk-ins for vaccines?',
      answer: 'While we recommend scheduling an appointment to ensure vaccine availability and reduce wait times, we do accept walk-ins during business hours based on availability.'
    },
    {
      id: 'side-effects',
      question: 'What are common side effects?',
      answer: 'Most people experience mild side effects like soreness at the injection site, mild fever, or fatigue. Serious side effects are rare. We\'ll monitor you for 15 minutes after vaccination.'
    },
    {
      id: 'multiple',
      question: 'Can I get multiple vaccines at once?',
      answer: 'Yes, most vaccines can be given at the same visit. Our pharmacists will review your vaccination history and recommend the appropriate spacing if needed.'
    },
    {
      id: 'pregnant',
      question: 'Are vaccines safe during pregnancy?',
      answer: 'Many vaccines are safe and recommended during pregnancy, including flu and Tdap vaccines. We\'ll consult with your healthcare provider to ensure the best care for you and your baby.'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Essential': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Seasonal': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Travel': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Age-specific': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div ref={headerRef} className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Vaccination Services</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Protect yourself and your community with our comprehensive vaccination services. 
            Book appointments, compare vaccines, and manage your vaccination records.
          </p>
        </div>

        <Tabs defaultValue="booking" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="booking">Book Appointment</TabsTrigger>
            <TabsTrigger value="vaccines">Vaccine Information</TabsTrigger>
            <TabsTrigger value="records">My Records</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
          </TabsList>

          {/* Booking Tab */}
          <TabsContent value="booking" className="space-y-6">
            <div ref={bookingRef}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Schedule Your Vaccination</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Location Selection */}
                    <div className="space-y-3">
                      <h3 className="font-semibold flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>Select Location</span>
                      </h3>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose pharmacy location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location.id} value={location.id.toString()}>
                              <div className="flex flex-col">
                                <span className="font-semibold">{location.name}</span>
                                <span className="text-xs text-muted-foreground">{location.distance}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedLocation && (
                        <div className="text-sm text-muted-foreground">
                          <p>📍 {locations.find(l => l.id.toString() === selectedLocation)?.address}</p>
                          <p className="text-green-600">✓ {locations.find(l => l.id.toString() === selectedLocation)?.availability}</p>
                        </div>
                      )}
                    </div>

                    {/* Date Selection */}
                    <div className="space-y-3">
                      <h3 className="font-semibold flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Select Date</span>
                      </h3>
                      <Select value={selectedDate} onValueChange={setSelectedDate}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Today, Dec 20</SelectItem>
                          <SelectItem value="tomorrow">Tomorrow, Dec 21</SelectItem>
                          <SelectItem value="dec22">Saturday, Dec 22</SelectItem>
                          <SelectItem value="dec23">Sunday, Dec 23</SelectItem>
                          <SelectItem value="dec24">Monday, Dec 24</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Time Selection */}
                    <div className="space-y-3">
                      <h3 className="font-semibold flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Select Time</span>
                      </h3>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Group Booking Option */}
                  <div className="border rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Group Booking</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Booking for multiple people? We offer group appointments for families or teams.
                    </p>
                    <Button variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Book for Multiple People
                    </Button>
                  </div>

                  {/* Booking Confirmation */}
                  {selectedLocation && selectedDate && selectedTime && (
                    <div className="border rounded-lg p-4 bg-muted/50 space-y-3">
                      <h3 className="font-semibold">Booking Summary</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>Location:</strong> {locations.find(l => l.id.toString() === selectedLocation)?.name}</p>
                        <p><strong>Date:</strong> {selectedDate}</p>
                        <p><strong>Time:</strong> {selectedTime}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button className="btn-medical flex-1">
                          <Check className="w-4 h-4 mr-2" />
                          Confirm Booking
                        </Button>
                        <Button variant="outline">
                          <Mail className="w-4 h-4 mr-2" />
                          Email Confirmation
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Vaccines Information Tab */}
          <TabsContent value="vaccines" className="space-y-6">
            <div ref={vaccinesRef}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vaccines.map((vaccine) => (
                  <Card key={vaccine.id} className="medical-card-hover">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{vaccine.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{vaccine.description}</p>
                        </div>
                        <Badge className={getCategoryColor(vaccine.category)}>
                          {vaccine.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Price:</span>
                          <span className="font-bold text-primary">{vaccine.price}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Effectiveness:</span>
                            <span className="text-sm font-semibold text-green-600">{vaccine.effectiveness}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Protection:</span>
                            <span className="text-sm">{vaccine.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Next Shot:</span>
                            <span className="text-sm">{vaccine.nextShot}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-sm font-medium">Common Side Effects:</span>
                          <p className="text-xs text-muted-foreground">{vaccine.sideEffects}</p>
                        </div>
                      </div>

                      <Button className="w-full btn-medical">
                        <Shield className="w-4 h-4 mr-2" />
                        Book This Vaccine
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Comparison Chart */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Vaccine Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Vaccine</th>
                          <th className="text-left p-2">Price</th>
                          <th className="text-left p-2">Effectiveness</th>
                          <th className="text-left p-2">Duration</th>
                          <th className="text-left p-2">Schedule</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vaccines.map((vaccine) => (
                          <tr key={vaccine.id} className="border-b hover:bg-muted/50">
                            <td className="p-2 font-medium">{vaccine.name}</td>
                            <td className="p-2">{vaccine.price}</td>
                            <td className="p-2 text-green-600">{vaccine.effectiveness}</td>
                            <td className="p-2">{vaccine.duration}</td>
                            <td className="p-2">{vaccine.nextShot}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Records Tab */}
          <TabsContent value="records" className="space-y-6">
            <div ref={recordsRef}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span>Vaccination Records</span>
                    </CardTitle>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vaccinationRecords.map((record) => (
                      <div key={record.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="font-semibold">{record.vaccine}</h3>
                            <p className="text-sm text-muted-foreground">
                              Administered on {new Date(record.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Location: {record.location}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Lot #: {record.lotNumber}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">
                              Next: {new Date(record.nextDue).toLocaleDateString()}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* FAQs Tab */}
          <TabsContent value="faqs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="mt-8 border-t pt-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-semibold">Still have questions?</h3>
                    <p className="text-muted-foreground">
                      Our pharmacists are here to help with any vaccination concerns.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button className="btn-medical">
                        <Phone className="w-4 h-4 mr-2" />
                        Call (555) 123-4567
                      </Button>
                      <Button variant="outline">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Questions
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}