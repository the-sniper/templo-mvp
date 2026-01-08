import Header from '@/components/Header';
import TempleList from '@/components/TempleList';
import Footer from '@/components/Footer';

const Temples = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      {/* Temple List Section */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <TempleList />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Temples;
