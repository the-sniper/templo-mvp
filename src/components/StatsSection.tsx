import { Users, MapPin, Heart, Star } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { icon: MapPin, value: '500+', label: 'Temples Listed' },
    { icon: Users, value: '50K+', label: 'Active Devotees' },
    { icon: Heart, value: '1M+', label: 'Donations Made' },
    { icon: Star, value: '4.9', label: 'User Rating' },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="rounded-3xl bg-gradient-to-r from-primary/10 via-accent/30 to-primary/10 p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl mb-2">
            Trusted by Devotees Worldwide
          </h2>
          <p className="text-muted-foreground">
            Join thousands of devotees connecting with their faith
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-3">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="font-serif text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;