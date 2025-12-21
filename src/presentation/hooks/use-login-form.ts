import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const formSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  });

export const UseLoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<{
        email: string;
        password: string;
      }>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
      });
    return {
        register,
        handleSubmit,
        errors,
    }
}