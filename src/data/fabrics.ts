export interface Fabric {
  id: string;
  name: string;
  line: "Bouclé" | "Linho" | "Veludo";
  color: string;
  texture: string;
  properties: string[];
  premium?: boolean;
}

export const fabrics: Fabric[] = [
  {
    id: "boucle-cream",
    name: "Bouclé Cream",
    line: "Bouclé",
    color: "Creme",
    texture: "/src/assets/textures/boucle-cream.jpg",
    properties: ["Resistente", "Textura Única", "Fácil Limpeza"],
  },
  {
    id: "boucle-sand",
    name: "Bouclé Areia",
    line: "Bouclé",
    color: "Areia",
    texture: "/src/assets/textures/boucle-sand.jpg",
    properties: ["Durável", "Moderno", "Versátil"],
  },
  {
    id: "boucle-ivory",
    name: "Bouclé Marfim",
    line: "Bouclé",
    color: "Marfim",
    texture: "/src/assets/textures/boucle-ivory.jpg",
    properties: ["Elegante", "Aconchegante", "Sofisticado"],
    premium: true,
  },
  {
    id: "linen-beige",
    name: "Linho Natural",
    line: "Linho",
    color: "Bege",
    texture: "/src/assets/textures/linen-beige.jpg",
    properties: ["Natural", "Respirável", "Elegante"],
  },
  {
    id: "linen-gray",
    name: "Linho Cinza",
    line: "Linho",
    color: "Cinza",
    texture: "/src/assets/textures/linen-gray.jpg",
    properties: ["Sofisticado", "Natural", "Atemporal"],
  },
  {
    id: "linen-white",
    name: "Linho Branco",
    line: "Linho",
    color: "Branco",
    texture: "/src/assets/textures/linen-white.jpg",
    properties: ["Puro", "Fresco", "Minimalista"],
  },
  {
    id: "velvet-terracotta",
    name: "Veludo Terracota",
    line: "Veludo",
    color: "Terracota",
    texture: "/src/assets/textures/velvet-terracotta.jpg",
    properties: ["Luxuoso", "Macio", "Premium"],
    premium: true,
  },
  {
    id: "velvet-rust",
    name: "Veludo Ferrugem",
    line: "Veludo",
    color: "Ferrugem",
    texture: "/src/assets/textures/velvet-rust.jpg",
    properties: ["Rico", "Aconchegante", "Premium"],
    premium: true,
  },
  {
    id: "velvet-green",
    name: "Veludo Verde Floresta",
    line: "Veludo",
    color: "Verde",
    texture: "/src/assets/textures/velvet-green.jpg",
    properties: ["Sofisticado", "Profundo", "Luxuoso"],
    premium: true,
  },
];
