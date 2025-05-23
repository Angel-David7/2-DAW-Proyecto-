interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    role: string;
}

export function getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        return JSON.parse(userStr);
    }
    return null;
}
