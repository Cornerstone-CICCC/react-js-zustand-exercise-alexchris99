import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { persist } from "zustand/middleware";

type User = {
	id: string;
	firstname: string;
	lastname: string;
	age: number;
	hobbies: string[];
};

type UsersStoreState = {
	users: User[];
	addUser: (user: Omit<User, "id">) => void;
	deleUser: (id: string) => void;
};

export const useUserStore = create<UsersStoreState>()(
	persist(
		(set) => ({
			users: [],
			addUser: (user: Omit<User, "id">) => {
				const newUser: User = {
					...user,
					id: uuidv4(),
				};
				set((state) => ({ users: [...state.users, newUser] }));
			},
			deleUser: (id: string) => {
				set((state) => ({
					users: state.users.filter((user) => user.id !== id),
				}));
			},
		}),
		{ name: "user-storage" },
	),
);
