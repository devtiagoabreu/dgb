import { useState, useRef, useEffect } from "react";
import { fabrics, Fabric } from "@/data/fabrics";
import { ChevronLeft, ChevronRight, Download, Heart, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import sofaBase from "@/assets/sofa-base.png";

type FurniturePart = "sofa" | "armchair" | "cushions";

interface PartSelection {
  sofa: Fabric | null;
  armchair: Fabric | null;
  cushions: Fabric | null;
}

const Simulator = () => {
  const [selectedPart, setSelectedPart] = useState<FurniturePart>("sofa");
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [partFabrics, setPartFabrics] = useState<PartSelection>({
    sofa: null,
    armchair: null,
    cushions: null,
  });
  const [favorites, setFavorites] = useState<PartSelection[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const lines = Array.from(new Set(fabrics.map((f) => f.line)));
  const filteredFabrics = selectedLine
    ? fabrics.filter((f) => f.line === selectedLine)
    : fabrics;

  useEffect(() => {
    drawScene();
  }, [partFabrics]);

  const drawScene = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw base image
    const img = new Image();
    img.src = sofaBase;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Apply textures to selected parts
      if (partFabrics.sofa) {
        applyTexture(ctx, partFabrics.sofa, "sofa");
      }
      if (partFabrics.armchair) {
        applyTexture(ctx, partFabrics.armchair, "armchair");
      }
      if (partFabrics.cushions) {
        applyTexture(ctx, partFabrics.cushions, "cushions");
      }
    };
  };

  const applyTexture = (
    ctx: CanvasRenderingContext2D,
    fabric: Fabric,
    part: FurniturePart
  ) => {
    // Load and apply texture pattern
    const texture = new Image();
    texture.src = fabric.texture;
    texture.onload = () => {
      const pattern = ctx.createPattern(texture, "repeat");
      if (!pattern) return;

      ctx.save();
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = pattern;

      // Define regions for each furniture part
      const regions = {
        sofa: { x: 200, y: 250, w: 600, h: 300 },
        armchair: { x: 100, y: 200, w: 200, h: 250 },
        cushions: { x: 350, y: 300, w: 300, h: 100 },
      };

      const region = regions[part];
      ctx.fillRect(region.x, region.y, region.w, region.h);
      ctx.restore();
    };
  };

  const handleFabricSelect = (fabric: Fabric) => {
    setPartFabrics((prev) => ({
      ...prev,
      [selectedPart]: fabric,
    }));
    toast.success(`${fabric.name} aplicado ao ${selectedPart === "sofa" ? "sofá" : selectedPart === "armchair" ? "poltrona" : "almofadas"}`);
  };

  const handleReset = () => {
    setPartFabrics({ sofa: null, armchair: null, cushions: null });
    toast.info("Simulação resetada");
  };

  const handleSaveFavorite = () => {
    setFavorites((prev) => [...prev, partFabrics]);
    toast.success("Combinação salva nos favoritos!");
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "textile-elegance-simulacao.png";
    link.href = canvas.toDataURL();
    link.click();
    toast.success("Imagem baixada!");
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Simulador de Tecidos
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Canvas Area */}
          <div className="fabric-card p-6">
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={1000}
                height={600}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Controls */}
            <div className="flex gap-4 mt-4 flex-wrap">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <RotateCcw size={18} />
                Resetar
              </button>
              <button
                onClick={handleSaveFavorite}
                className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Heart size={18} />
                Salvar Favorito
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all"
              >
                <Download size={18} />
                Baixar Imagem
              </button>
            </div>
          </div>

          {/* Selection Panel */}
          <div className="space-y-6">
            {/* Part Selection */}
            <div className="fabric-card p-6">
              <h3 className="text-lg font-semibold mb-4">Selecione a Parte do Móvel</h3>
              <div className="grid grid-cols-3 gap-2">
                {(["sofa", "armchair", "cushions"] as FurniturePart[]).map((part) => (
                  <button
                    key={part}
                    onClick={() => setSelectedPart(part)}
                    className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                      selectedPart === part
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {part === "sofa" ? "Sofá" : part === "armchair" ? "Poltrona" : "Almofadas"}
                  </button>
                ))}
              </div>
            </div>

            {/* Line Selection */}
            <div className="fabric-card p-6">
              <h3 className="text-lg font-semibold mb-4">Linha de Tecidos</h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setSelectedLine(null)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    !selectedLine
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  Todos
                </button>
                {lines.map((line) => (
                  <button
                    key={line}
                    onClick={() => setSelectedLine(line)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      selectedLine === line
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {line}
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric Grid */}
            <div className="fabric-card p-6">
              <h3 className="text-lg font-semibold mb-4">
                Escolha o Tecido {selectedLine && `- ${selectedLine}`}
              </h3>
              <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
                {filteredFabrics.map((fabric) => (
                  <button
                    key={fabric.id}
                    onClick={() => handleFabricSelect(fabric)}
                    className="fabric-card p-4 text-left group"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden mb-2">
                      <img
                        src={fabric.texture}
                        alt={fabric.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <h4 className="font-medium">{fabric.name}</h4>
                    <p className="text-sm text-muted-foreground">{fabric.color}</p>
                    {fabric.premium && (
                      <span className="inline-block mt-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                        Premium
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
