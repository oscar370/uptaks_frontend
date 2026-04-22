import { updateProject } from "@/api/ProjectAPI";
import type { Project, ProjectFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProjectForm from "./ProjectForm";

type EditProjectFormProps = {
  data: ProjectFormData;
  projectId: Project["_id"];
};

export default function EditProjectForm({
  data,
  projectId,
}: EditProjectFormProps) {
  const navigate = useNavigate();
  const initialValues: ProjectFormData = {
    projectName: data.projectName,
    clientName: data.projectName,
    description: data.description,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
      toast.success(result);
      navigate("/");
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    const data = {
      formData,
      projectId,
    };

    mutate(data);
  };

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-bold">Editar Proyecto</h1>

        <p className="mt-5 text-2xl font-light text-gray-500">
          Llena el siguiente formulario para editar un proyecto
        </p>

        <nav className="my-5">
          <Link
            className="cursor-pointer bg-purple-400 px-10 py-3 text-xl font-bold text-white transition-colors hover:bg-purple-500"
            to="/"
          >
            Volver a proyectos
          </Link>
        </nav>

        <form
          className="mt-10 rounded-lg bg-white p-10 shadow-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />

          <input
            type="submit"
            value="Guardar cambios"
            className="w-full cursor-pointer bg-fuchsia-600 p-3 font-bold text-white uppercase transition-colors hover:bg-fuchsia-700"
          />
        </form>
      </div>
    </>
  );
}
