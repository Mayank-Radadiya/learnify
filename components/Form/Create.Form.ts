import * as z from "zod";

export const CreateFormSchema = z.object({
    title: z.string().nonempty().min(1 , {
        message: "Title is required"
    })
})