import { useForm, type SubmitHandler, type SubmitErrorHandler } from "react-hook-form";
import { courseResolver, type CourseFormData } from "../types/courses";

type Props = {
  initial: CourseFormData;     // prefill with course data
  onCancel: () => void;
};

export default function CourseForm({ initial, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormData>({
    defaultValues: initial,
    mode: "onChange",
    resolver: courseResolver,
  });

  const onSubmit: SubmitHandler<CourseFormData> = async (_data) => {
    // Spec: do nothing on submit (no persistence)
    // await new Promise(r => setTimeout(r, 300)); // (optional) simulate delay
  };

  const onError: SubmitErrorHandler<CourseFormData> = () => {
    // optional: toast/log
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
        <button type="submit" className="rounded-md border px-3 py-1" disabled={isSubmitting}>
          Save (no-op)
        </button>
      </div>
    </form>
  );
}
