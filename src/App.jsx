import { useEffect, useState } from "react";
import { Users } from "./Users";

export default function App() {
  const [user, setUser] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return Promise.reject(res);
        }
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => setError(err));
  }, []);

  return (
    <>
      <h1>User List</h1>
      <ul>
        {user.map((user) => (
          <Users key={user.id} name={user.name} />
        ))}
      </ul>
    </>
  );
}
