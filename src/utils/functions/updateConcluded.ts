import { DataValues } from '../interfaces/dataValues'

export const updateConcluded = (todo: DataValues, concluded: boolean) => {
    todo.concluded = concluded
}
