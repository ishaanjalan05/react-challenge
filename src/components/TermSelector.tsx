// src/components/TermSelector.tsx
type Term = "Fall" | "Winter" | "Spring";

type Props = { selected: Term; setSelected: (t: Term) => void };

export default function TermSelector({ selected, setSelected }: Props) {
  const terms: Term[] = ["Fall", "Winter", "Spring"];
  return (
    <div className="my-6 flex justify-center gap-2">
      {terms.map(t => (
        <button
          key={t}
          type="button"
          onClick={() => setSelected(t)}
          className={
            "rounded-md border px-3 py-1 " +
            (selected === t ? "bg-black text-white" : "bg-white")
          }
          aria-pressed={selected === t}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
