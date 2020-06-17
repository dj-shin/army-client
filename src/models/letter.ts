export interface Letter {
    _id: string,
    title: string;
    content: string;
    sender: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    isPublic: boolean;
}

export const parseLetter = (response: any): Letter => {
    const letter = response;
    if (typeof response.completed === "string") {
        letter.completed = response.completed.toLowerCase() === "true";
    }
    if (typeof response.isPublic === "string") {
        letter.isPublic = response.isPublic.toLowerCase() === "true";
    }
    if (typeof response.createdAt === "string") {
        letter.createdAt = new Date(response.createdAt);
    }
    if (typeof response.updatedAt === "string") {
        letter.updatedAt = new Date(response.updatedAt);
    }
    return letter as Letter;
}

