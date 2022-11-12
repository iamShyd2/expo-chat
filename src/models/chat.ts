import { IMessage } from "./message"
import { IUser } from "./user"

export interface IChat {
    id: number
    user: IUser
    last_message: IMessage
}