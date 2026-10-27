interface TickerProps {
  items: string[];
  className?: string;
  /** Duración de una vuelta completa */
  duration?: string;
}

/** Cinta de datos que corre. El contenido va dos veces (la copia, oculta para lectores) para que el loop no corte. */
export default function Ticker({ items, className = "", duration = "40s" }: TickerProps) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center">
          <span className="px-4">{item}</span>
          <span aria-hidden className="text-[0.8em]">
            ✺
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`ticker display ${className}`}>
      <div className="ticker-track" style={{ "--ticker-dur": duration } as React.CSSProperties}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
