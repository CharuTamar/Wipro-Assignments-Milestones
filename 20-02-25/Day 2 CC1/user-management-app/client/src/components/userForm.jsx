import { useState } from "react";

const UserForm = ({ addUser }) => {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            addUser(name);
            setName("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">Add User</button>
        </form>
    );
};

export default UserForm;
