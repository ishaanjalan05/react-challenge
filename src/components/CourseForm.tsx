import { useForm, type SubmitHandler, type SubmitErrorHandler } from "react-hook-form";
import { courseResolver, type CourseFormData } from "../types/courses";
import { updateCourse } from "../utilities/firebase";

type Props = {
  id: string;                 // course ID being edited (e.g., "F101")
  initial: CourseFormData;    // pre-filled values
  onCancel: () => void;
  onSaved?: () => void;       // optional: close modal / toast
};

export default function CourseForm({ id, initial, onCancel, onSaved }: Props) {
    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
  } = useForm<CourseFormData>({
    defaultValues: initial,
    mode: "onChange",
    resolver: courseResolver,
  });

  const onSubmit: SubmitHandler<CourseFormData> = async (data) => {
    // Build a strongly-typed patch so "term" stays a narrow union
    const patch: Partial<CourseFormData> = {
      ...(data.title  !== initial.title  ? { title:  data.title  } : {}),
      ...(data.term   !== initial.term   ? { term:   data.term   } : {}),
      ...(data.number !== initial.number ? { number: data.number } : {}),
      ...(data.meets  !== initial.meets  ? { meets:  data.meets  } : {}),
    };

    if (Object.keys(patch).length === 0) { onCancel(); return; }

    await updateCourse(id, patch);
    reset(data);
    onSaved?.();
  };

  const onError: SubmitErrorHandler<CourseFormData> = () => {
    // nothing special: RHF will show inline messages already
  };

  const field = "mt-1 w-full rounded border p-2";
  const msg = "mt-1 text-sm text-red-600";

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
      <h2 className="text-lg font-semibold">Edit course</h2>

      <label className="block">
        <p className="font-medium">Title</p>
        <input type="text" {...register("title")} className={field} />
        {errors.title && <p className={msg}>{errors.title.message}</p>}
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <p className="font-medium">Term</p>
          <select {...register("term")} className={field}>
            <option>Fall</option>
            <option>Winter</option>
            <option>Spring</option>
            <option>Summer</option>
          </select>
          {errors.term && <p className={msg}>{errors.term.message}</p>}
        </label>

        <label className="block">
          <p className="font-medium">Number</p>
          <input type="text" placeholder="e.g., 213 or 213-2" {...register("number")} className={field} />
          {errors.number && <p className={msg}>{errors.number.message}</p>}
        </label>
      </div>

      <label className="block">
        <p className="font-medium">Meets</p>
        <input
          type="text"
          placeholder='e.g., MWF 12:00-13:20 or empty'
          {...register("meets")}
          className={field}
        />
        {errors.meets && <p className={msg}>{errors.meets.message}</p>}
      </label>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" className="rounded-md border px-3 py-1" onClick={onCancel}>
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md border px-3 py-1"
          disabled={isSubmitting || !isValid || !isDirty}
          title={!isValid ? "Fix errors first" : !isDirty ? "No changes" : ""}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
