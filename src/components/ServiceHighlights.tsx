import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  CalendarCheck, 
  Palmtree, 
  Play, 
  Heart, 
  History,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ServiceHighlights = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: CreditCard,
      title: 'Online Donations',
      description: 'Support temples with secure donations. Get instant digital receipts.',
      link: '/temples',
      color: 'from-primary/20 to-primary/5',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      icon: CalendarCheck,
      title: 'Book Darshan',
      description: 'Reserve special darshan slots and skip the queue at temples.',
      link: '/temples',
      color: 'from-accent/40 to-accent/10',
      iconBg: 'bg-accent/20',
      iconColor: 'text-primary',
    },
    {
      icon: Palmtree,
      title: 'Request Pooja',
      description: 'Book traditional poojas performed by temple priests on your behalf.',
      link: '/temples',
      color: 'from-primary/15 to-accent/20',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      icon: Play,
      title: 'Live Darshan',
      description: 'Experience divine darshan from anywhere with live streaming.',
      link: '/temples',
      color: 'from-accent/30 to-primary/10',
      iconBg: 'bg-accent/20',
      iconColor: 'text-primary',
    },
    {
      icon: Heart,
      title: 'Follow Temples',
      description: 'Stay updated with announcements, festivals, and events.',
      link: '/temples',
      color: 'from-primary/20 to-accent/15',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      icon: History,
      title: 'Ancestral Temple',
      description: 'Discover your family\'s ancestral temple based on your lineage.',
      link: '/ancestral',
      color: 'from-accent/35 to-primary/15',
      iconBg: 'bg-accent/20',
      iconColor: 'text-primary',
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="text-center mb-10">
        <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl mb-3">
          Our Services
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Everything you need to connect with temples, from donations to live darshan
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Link
            key={index}
            to={service.link}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-50 group-hover:opacity-70 transition-opacity`} />
            <div className="relative">
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${service.iconBg} mb-4`}>
                <service.icon className={`h-6 w-6 ${service.iconColor}`} />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {service.description}
              </p>
              <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ServiceHighlights;