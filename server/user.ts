export type UserMessage = {
    id: string;
    message: string;
}
export const createUser = (data: UserMessage) => ({
    id: data.id,
    messages: [],
})
