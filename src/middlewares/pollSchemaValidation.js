import dayjs from 'dayjs';
import { pollSchema } from '../models/pollModel.js';

export function pollSchemaValidation(req, res, next){
    const { title, expireAt } = req.body;

    const now = dayjs();
    const at30days = now.add('30', 'day');
    const expireAt30 = at30days.format("YYYY-MM-DD") + " " + dayjs().format("HH:mm");

    const pollObject = {
        title,
        expireAt: expireAt.length===0 ? expireAt30 : expireAt
    }

    const { error } = pollSchema.validate(pollObject, {
        abortEarly: false
    });

    if(error){
    const errors = error.details;
    const errorsTXT = errors.map(detail => detail.message);
    res.status(422).send(errorsTXT);
    }

    res.locals.poll = pollObject;

    next();
}