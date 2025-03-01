import { useState, useEffect } from "react";
import UserList from "./components/userList";
import UserForm from "./components/userForm";

const App = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    const addUser = (name) => {
        fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        })
        .then((res) => res.json())
        .then((newUser) => setUsers([...users, newUser]));
    };

    return (
        <div>
            <h1>User Management System</h1>
            <UserForm addUser={addUser} />
            <UserList users={users} />
        </div>
    );
};

export default App;
