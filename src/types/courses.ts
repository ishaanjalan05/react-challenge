import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const DAY_TOKENS = ["Th", "Tu", "Sa", "Su", "M", "W", "F"] as const; // multi-letter first
type Day = typeof DAY_TOKENS[number];

const parseDays = (s: string): Day[] => {
  const days: Day[] = [];
  let i = 0;
  const used = new Set<string>();
  while (i < s.length) {
    const two = s.slice(i, i + 2);
    const one = s[i];
    if (DAY_TOKENS.includes(two as Day)) {
      if (used.has(two)) return []; // duplicate
      days.push(two as Day);
      used.add(two);
      i += 2;
    } else if (DAY_TOKENS.includes(one as Day)) {
      if (used.has(one)) return []; // duplicate
      days.push(one as Day);
      used.add(one);
      i += 1;
    } else {
      i += 1; // skip unknown char
    }
  }
  return days;
};

const timeToMin = (hhmm: string): number | null => {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm);
  if (!m) return null;
  const h = Number(m[1]), min = Number(m[2]);
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return h * 60 + min;
};

export const isValidMeets = (meets: string): boolean => {
  const s = meets.trim();
  if (s === "") return true; // empty is allowed, never conflicts
  // expect "DAYS START-END"
  const parts = s.split(/\s+/);
  if (parts.length < 2) return false;
  const daysPart = parts[0];
  const timePart = parts.slice(1).join(" "); // support accidental extra spaces

  const days = parseDays(daysPart);
  if (days.length === 0) return false;

  const t = /^(\d{1,2}:\d{2})-(\d{1,2}:\d{2})$/.exec(timePart);
  if (!t) return false;

  const start = timeToMin(t[1]);
  const end = timeToMin(t[2]);
  if (start == null || end == null) return false;
  if (start >= end) return false;

  return true;
};

export const courseSchema = z.object({
  title: z.string().trim().min(2, "title must be at least 2 characters"),
  term: z.enum(["Fall", "Winter", "Spring", "Summer"], {
  message: "term must be Fall, Winter, Spring, or Summer",
}),
  number: z
    .string()
    .regex(/^\d{3}(-\d+)?$/, 'number must be like "213" or "213-2"'),
  meets: z
    .string()
    .refine(isValidMeets, {
      message: 'must contain days and start-end, e.g., "MWF 12:00-13:20" or be empty',
    }),
});

export type CourseFormData = z.infer<typeof courseSchema>;
export const courseResolver = zodResolver(courseSchema);



