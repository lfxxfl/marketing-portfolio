export function SectionHeading({ number, label, title, intro }: { number: string; label: string; title: string; intro?: string }) {
  return (
    <header className="home-chapter-heading">
      <div><span>{number}</span><p className="section-kicker">{label}</p></div>
      <div><h2>{title}</h2>{intro && <p>{intro}</p>}</div>
    </header>
  );
}
