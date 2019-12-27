export declare type UserMessage = {
    id: string;
    message: string;
};
export declare const createUser: (data: UserMessage) => {
    id: string;
    messages: never[];
};
