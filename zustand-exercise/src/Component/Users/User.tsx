import { useState, type FormEvent } from "react";
import { useUserStore } from "../../Store/user.store";
import toast from "react-hot-toast";

export function User() {
	const [firstname, setFirstname] = useState<string>("");
	const [lastname, setLastname] = useState<string>("");
	const [age, setAge] = useState<number>(0);
	const [hobbies, setHobbies] = useState<string[]>([""]);
	const { users, addUser, deleUser } = useUserStore();

	const handleHobbies = (e: InputEvent<HTMLInputElement>) => {
		if (e.checked) {
			setHobbies((prev) => [...prev, e.value]);
		} else {
			setHobbies(hobbies.filter((hob) => hob !== e.value));
		}
	};

	const handleAdd = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addUser({
			firstname: firstname,
			lastname: lastname,
			age: age,
			hobbies: hobbies,
		});
		setAge(0);
		setFirstname("");
		setLastname("");
		setHobbies([""]);
		toast.success("User added");
	};

	const handleDelete = (id: string) => {
		deleUser(id);
		toast.error("User deleted");
	};

	return (
		<div>
			<h2>Users</h2>
			<form onSubmit={handleAdd}>
				<input
					type="text"
					value={firstname}
					onChange={(e) => setFirstname(e.target.value)}
					placeholder="Name"
				/>
				<input
					type="text"
					value={lastname}
					onChange={(e) => setLastname(e.target.value)}
					placeholder="Lastname"
				/>
				<input
					type="number"
					value={age}
					onChange={(e) => setAge(Number(e.target.value))}
					placeholder="Age"
				/>
				<fieldset>
					<label>
						Cook
						<input
							name="hobbies"
							type="checkbox"
							value={"Cook"}
							onClick={(e) => handleHobbies(e.target)}
						/>
					</label>
					<label>
						Write
						<input
							name="hobbies"
							type="checkbox"
							value={"Write"}
							onClick={(e) => handleHobbies(e.target)}
						/>
					</label>
					<label>
						Run
						<input
							name="hobbies"
							type="checkbox"
							value={"Run"}
							onClick={(e) => handleHobbies(e.target)}
						/>
					</label>
				</fieldset>
				<button type="submit">Add employee</button>
			</form>
			<ul>
				{users.map((user) => (
					<li key={user.id}>
						<span>
							Name: {user.firstname} {user.lastname}, Age: {user.age}, Hobbies:{" "}
							{user.hobbies.map((hob, i) => (
								<span key={i}>{hob} </span>
							))}
						</span>
						<button type="button" onClick={() => handleDelete(user.id)}>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
