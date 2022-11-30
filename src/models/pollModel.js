import joi from "joi";

export const pollSchema = joi.object({
    title: joi.string().min(3).required(),
	expireAt: joi.string().min(16).max(16)
});