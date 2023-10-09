import { useEffect, useState } from "react";
import { Users } from "./Users";

export default function App() {
  const [user, setUser] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  let jsx;

  if (loading) {
    jsx = <h2>Loading...</h2>;
  } else if (error != null) {
    jsx = <h2>Error Loading Data!</h2>;
  } else {
    jsx = JSON.stringify(user);
  }

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
