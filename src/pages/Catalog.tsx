import { useState } from "react";
import { fabrics } from "@/data/fabrics";
import { Search, Filter, X } from "lucide-react";

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);

  const lines = Array.from(new Set(fabrics.map((f) => f.line)));

  const filteredFabrics = fabrics.filter((fabric) => {
    const matchesSearch =
      fabric.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fabric.color.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLine = !selectedLine || fabric.line === selectedLine;
    const matchesPremium = !showPremiumOnly || fabric.premium;

    return matchesSearch && matchesLine && matchesPremium;
  });

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Catálogo de Tecidos
        </h1>

        {/* Filters */}
        <div className="fabric-card p-6 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar por nome ou cor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Premium Filter */}
            <label className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
              <input
                type="checkbox"
                checked={showPremiumOnly}
                onChange={(e) => setShowPremiumOnly(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="font-medium">Apenas Premium</span>
            </label>
          </div>

          {/* Line Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedLine(null)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !selectedLine
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              Todas as Linhas
            </button>
            {lines.map((line) => (
              <button
                key={line}
                onClick={() => setSelectedLine(line)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedLine === line
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {line}
              </button>
            ))}
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedLine || showPremiumOnly) && (
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <span className="text-sm text-muted-foreground">Filtros ativos:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                  "{searchTerm}"
                  <button onClick={() => setSearchTerm("")}>
                    <X size={14} />
                  </button>
                </span>
              )}
              {selectedLine && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                  {selectedLine}
                  <button onClick={() => setSelectedLine(null)}>
                    <X size={14} />
                  </button>
                </span>
              )}
              {showPremiumOnly && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-sm">
                  Premium
                  <button onClick={() => setShowPremiumOnly(false)}>
                    <X size={14} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-6">
          {filteredFabrics.length} {filteredFabrics.length === 1 ? "tecido encontrado" : "tecidos encontrados"}
        </p>

        {/* Fabric Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFabrics.map((fabric) => (
            <div key={fabric.id} className="fabric-card overflow-hidden group">
              <div className="aspect-square overflow-hidden">
                <img
                  src={fabric.texture}
                  alt={fabric.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{fabric.name}</h3>
                  {fabric.premium && (
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded font-medium">
                      Premium
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {fabric.line} • {fabric.color}
                </p>
                <div className="flex flex-wrap gap-1">
                  {fabric.properties.map((prop) => (
                    <span
                      key={prop}
                      className="px-2 py-1 bg-muted rounded text-xs"
                    >
                      {prop}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFabrics.length === 0 && (
          <div className="text-center py-12">
            <Filter className="mx-auto mb-4 text-muted-foreground" size={48} />
            <h3 className="text-xl font-semibold mb-2">Nenhum tecido encontrado</h3>
            <p className="text-muted-foreground">
              Tente ajustar seus filtros ou busca
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
