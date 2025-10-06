const DAY_TOKENS = ["Th", "Tu", "Sa", "Su", "M", "W", "F"] as const;
type Day = typeof DAY_TOKENS[number];

const parseDays = (s: string): Day[] => {
  const days: Day[] = [];
  let i = 0;
  while (i < s.length) {
    const two = s.slice(i, i + 2);
    const one = s[i];
    if (DAY_TOKENS.includes(two as Day)) {
      days.push(two as Day);
      i += 2;
    } else if (DAY_TOKENS.includes(one as Day)) {
      days.push(one as Day);
      i += 1;
    } else {
      // unknown char, skip
      i += 1;
    }
  }
  return days;
};

const timeToMin = (hhmm: string): number => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const spansOverlap = (aStart: number, aEnd: number, bStart: number, bEnd: number) =>
  aStart < bEnd && bStart < aEnd;

const daysOverlap = (a: Day[], b: Day[]) => {
  const set = new Set(a);
  return b.some(d => set.has(d));
};

const parseMeets = (meets: string) => {
  const trimmed = meets.trim();
  if (!trimmed) return null;

  const [daysPart, timePart] = trimmed.split(/\s+/, 2);
  if (!daysPart || !timePart) return null;
  const [start, end] = timePart.split("-");
  if (!start || !end) return null;
  return {
    days: parseDays(daysPart),
    start: timeToMin(start),
    end: timeToMin(end),
  };
};

export const coursesConflict = (
  a: { term: string; meets: string },
  b: { term: string; meets: string }
): boolean => {
  if (a.term !== b.term) return false;
  const A = parseMeets(a.meets);
  const B = parseMeets(b.meets);
  if (!A || !B) return false; 
  return daysOverlap(A.days, B.days) && spansOverlap(A.start, A.end, B.start, B.end);
};

export const conflictsWithAny = (
  candidateId: string,
  selectedIds: string[],
  courses: Record<string, { term: string; meets: string }>
): boolean => {
  const cand = courses[candidateId];
  if (!cand) return false;
  return selectedIds.some(id => id !== candidateId && coursesConflict(cand, courses[id]));
};
