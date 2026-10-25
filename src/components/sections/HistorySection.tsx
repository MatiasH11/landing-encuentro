import Image from "next/image";
import {
  HISTORY_TEXT,
  OBJECTIVES,
  ORGANIZED_BY,
  STATS,
} from "@/constants/history-data";

export default function HistorySection() {
  return (
    <section id="historia" className="px-4 sm:px-7">
      {/* La foto de la tira del lema, abierta a todo el ancho */}
      <figure className="relative -mx-4 h-[56svh] overflow-clip bg-night sm:-mx-7 sm:h-[86svh]">
        <Image
          src="/images/gallery/imagen-1.jpeg"
          alt="Delegación con trajes bordó girando las polleras en el escenario del Encuentro"
          fill
          sizes="100vw"
          className="drift object-cover object-[50%_60%]"
        />
      </figure>

      {/* Historia: un párrafo grande con la foto como letra capital */}
      <div className="mt-20 grid gap-y-10 sm:mt-40 lg:grid-cols-12 lg:gap-x-6">
        <h2 className="display text-head lg:col-span-12" data-reveal>
          {HISTORY_TEXT.headline}
        </h2>

        <dl className="grid grid-cols-3 gap-4 text-small max-lg:order-last lg:col-span-2 lg:grid-cols-1 lg:content-start lg:gap-6" data-reveal>
          <div>
            <dt className="text-muted">Nació en</dt>
            <dd className="font-semibold">Paso de la Patria, Corrientes</dd>
          </div>
          <div>
            <dt className="text-muted">Desde</dt>
            <dd className="font-semibold">2010</dd>
          </div>
          <div>
            <dt className="text-muted">Organizan</dt>
            <dd className="font-semibold">{ORGANIZED_BY.join(" y ")}</dd>
          </div>
        </dl>

        <div className="text-lead lg:col-span-10" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          <p className="max-w-[46ch]">
            <span className="relative float-left mr-[0.5em] mt-[0.15em] block size-[4.8em] overflow-clip sm:size-[3.7em]">
              <Image
                src="/images/gallery/imagen-7.jpeg"
                alt="Niños de una delegación bailando con vestimenta tradicional"
                fill
                sizes="(max-width: 640px) 110px, 140px"
                className="object-cover object-[35%_50%]"
              />
            </span>
            {HISTORY_TEXT.body}
          </p>
          <p className="mt-[1.2em] max-w-[46ch] text-muted">{HISTORY_TEXT.mission}</p>
        </div>
      </div>

      {/* Cifras alineadas como un libro de cuentas */}
      <div className="mt-20 grid gap-12 sm:mt-40 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5 lg:self-center" data-reveal>
          <h3 className="display text-head">
            <span className="block text-muted">Lo que reúne</span>
            <span className="block">cada Encuentro</span>
          </h3>
          <p className="mt-8 max-w-[44ch]">{HISTORY_TEXT.impact}</p>
          <p className="mt-4 max-w-[44ch]">{HISTORY_TEXT.credibility}</p>
        </div>

        {/* Una sola grilla: todas las cifras comparten el borde derecho y las leyendas el izquierdo */}
        <dl className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-6 gap-y-5 lg:col-span-6 lg:col-start-7">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="contents">
              <dt
                className="col-start-2 max-w-[22ch]"
                style={{ gridRow: i + 1 }}
                data-reveal
              >
                {stat.label}
              </dt>
              <dd
                className="display tabular col-start-1 text-right text-[15vw] leading-none sm:text-display"
                style={{ gridRow: i + 1, "--i": i } as React.CSSProperties}
                data-reveal
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Para qué existe */}
      <div className="mt-20 grid gap-10 sm:mt-40 lg:grid-cols-12 lg:gap-x-6">
        <h3 className="display text-head lg:col-span-5" data-reveal>
          Para qué existe el Encuentro
        </h3>
        <ul className="grid gap-x-10 gap-y-4 text-body sm:grid-cols-2 sm:gap-y-6 sm:text-lead lg:col-span-7">
          {OBJECTIVES.map((objective, i) => (
            <li key={objective.slice(0, 30)} data-reveal style={{ "--i": i } as React.CSSProperties}>
              {objective}
            </li>
          ))}
        </ul>
        <p className="max-w-[60ch] lg:col-span-7 lg:col-start-6" data-reveal>
          {HISTORY_TEXT.trust}
        </p>
      </div>
    </section>
  );
}
