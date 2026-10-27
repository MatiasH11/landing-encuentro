/**
 * Filtros SVG compartidos de la página. Se usan desde CSS con filter: url(#...).
 * - tinta: bordes de letra apenas irregulares, como serigrafía. Es estático: no se aplica a nada que se anime.
 */
export default function PaperFilters() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <defs>
        <filter id="tinta" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="ruido" />
          <feDisplacementMap in="SourceGraphic" in2="ruido" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
