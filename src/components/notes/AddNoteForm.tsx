import { createNote } from "@/api/NoteAPI";
import type { NoteFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorMessage from "../ErrorMessage";

export default function AddNoteForm() {
  const initialValue: NoteFormData = {
    content: "",
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const params = useParams();
  const projectId = params.projectId!;
  const taskId = queryParams.get("viewTask")!;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: initialValue });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      toast.success(result);
    },
  });

  const handleAddNote = (formData: NoteFormData) => {
    mutate({ projectId, taskId, formData });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className="space-y-3"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label className="font-bold" htmlFor="content">
          Crear Nota
        </label>

        <input
          id="content"
          type="text"
          className="w-full p-3 border border-gray-300"
          {...register("content", {
            required: "El contenido de la nota es obligatorio",
          })}
        />

        {errors.content && (
          <ErrorMessage> {errors.content.message} </ErrorMessage>
        )}
      </div>

      <input
        type="submit"
        value="Crear Nota"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer"
      />
    </form>
  );
}
