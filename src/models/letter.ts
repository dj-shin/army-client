export interface Letter {
    _id: string,
    title: string;
    content: string;
    sender: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}
