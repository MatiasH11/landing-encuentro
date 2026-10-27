// Borde de papel rasgado: una tira irregular del color de la sección que se monta sobre la anterior.
// Los puntos son fijos (no aleatorios) para que el render del servidor y del cliente coincidan.
const PUNTOS = [
  0, 9, 3, 11, 6, 14, 4, 10, 2, 12, 7, 15, 5, 9, 1, 13, 6, 10, 3, 14, 8, 11, 4, 12, 2, 9, 6, 15, 3, 10, 5, 13, 1, 11, 7, 9, 4, 14,
  2, 10, 6, 12, 3,
];

function camino(variante: number) {
  const n = PUNTOS.length - 1;
  const pts = PUNTOS.map((y, i) => {
    const yy = PUNTOS[(i + variante * 7) % PUNTOS.length];
    return `${((i / n) * 100).toFixed(2)},${(yy * 1.3).toFixed(1)}`;
  });
  return `M0,24 L${pts.join(" L")} L100,24 Z`;
}

interface TornEdgeProps {
  /** Clase de color de relleno, por ejemplo "fill-bordo" */
  className: string;
  variante?: number;
}

/** Tira de borde rasgado. Va arriba de una sección, con margen negativo, para que se vea pegada encima de la anterior. */
export default function TornEdge({ className, variante = 0 }: TornEdgeProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 24"
      preserveAspectRatio="none"
      className={`pointer-events-none block h-5 w-full sm:h-7 ${className}`}
    >
      <path d={camino(variante)} />
    </svg>
  );
}
