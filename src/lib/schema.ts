import {z} from "zod"

export const formSchema = z.object({
  name: z.string().min(3, {
    message: "Form name  must be at least 3 characters.",
  }),
  description:z.string().min(0 , {
    message: "Enter Description",
  })
});
