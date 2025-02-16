import * as z from "zod";

export const CreateFormSchema = z.object({
  title: z.string().nonempty({
    message: "Title is required",
  }),
});
