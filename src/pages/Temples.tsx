import Header from '@/components/Header';
import TempleList from '@/components/TempleList';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Temples = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Temple List Section */}
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <TempleList />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-bold text-foreground">Templo</p>
                <p className="text-xs text-muted-foreground">{t('sacredConnections')}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Temples;
