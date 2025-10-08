import { useState } from "react";

type Props = {
  initialTitle: string;
  initialMeets: string;
  onCancel: () => void;
  onSubmit?: (data: { title: string; meets: string }) => void; // optional, does nothing for now
};

export default function CourseForm({ initialTitle, initialMeets, onCancel, onSubmit }: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [meets, setMeets] = useState(initialMeets);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();     // required: do nothing
    // Optional: if you later want to see values in console
    onSubmit?.({ title, meets });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <h2 className="text-lg font-semibold">Edit course</h2>

      <label className="block">
        <p className="font-medium">Title</p>
        <input
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded border p-2"
        />
      </label>

      <label className="block">
        <p className="font-medium">Meets</p>
        <input
          name="meets"
          type="text"
          placeholder="e.g., MWF 09:00-09:50 or TuTh 14:00-15:20"
          value={meets}
          onChange={(e) => setMeets(e.target.value)}
          className="mt-1 w-full rounded border p-2"
        />
      </label>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" className="rounded-md border px-3 py-1" onClick={onCancel}>
          Cancel
        </button>
        {/* No Submit button per spec */}
      </div>
    </form>
  );
}
