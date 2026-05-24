export function SectionTitle({
  eyebrow,
  title,
  description
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-sm font-bold uppercase tracking-wide text-brand-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-2xl font-black text-graphite-950 md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 leading-7 text-graphite-600">{description}</p>
      ) : null}
    </div>
  );
}
