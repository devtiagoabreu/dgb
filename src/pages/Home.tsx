import { Link } from "react-router-dom";
import { ArrowRight, Palette, Sparkles, Award } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import heroImage1 from "@/assets/hero-living-room.jpg";
import heroImage2 from "@/assets/hero-living-room-2.jpg";
import heroImage3 from "@/assets/hero-living-room-3.jpg";
import heroImage4 from "@/assets/hero-living-room-4.jpg";

const heroImages = [heroImage1, heroImage2, heroImage3, heroImage4];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Carousel
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="absolute inset-0"
        >
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index}>
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Transforme Seus Espaços
            <br />
            <span className="text-primary">Com Elegância</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Tecidos premium importados para estofados e móveis. 
            Visualize em tempo real com nosso simulador interativo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/simulator" className="fabric-button-primary inline-flex items-center justify-center gap-2">
              Experimentar Simulador
              <ArrowRight size={20} />
            </Link>
            <Link to="/catalog" className="fabric-button-secondary inline-flex items-center justify-center gap-2">
              Ver Catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="fabric-section bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Por Que Escolher Textile Elegance?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="fabric-card p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Simulador Interativo</h3>
              <p className="text-muted-foreground">
                Visualize tecidos aplicados em móveis reais antes de decidir. 
                Experimente combinações ilimitadas.
              </p>
            </div>

            <div className="fabric-card p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Qualidade Premium</h3>
              <p className="text-muted-foreground">
                Tecidos importados de alta qualidade, testados para durabilidade 
                e resistência ao uso diário.
              </p>
            </div>

            <div className="fabric-card p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Variedade Exclusiva</h3>
              <p className="text-muted-foreground">
                Centenas de opções em bouclé, linho, veludo e mais. 
                Cores e texturas para todos os estilos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="fabric-section">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto fabric-card p-12">
            <h2 className="text-4xl font-bold mb-4">Pronto Para Começar?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Use nosso simulador para visualizar como nossos tecidos 
              ficam em seus móveis ou explore nosso catálogo completo.
            </p>
            <Link to="/simulator" className="fabric-button-primary inline-flex items-center gap-2">
              Iniciar Simulação
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
