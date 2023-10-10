import { useEffect, useState } from "react";
import { Users } from "./Users";

function App() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    setError(undefined);

    const controller = new AbortController();
    fetch("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal,
    })
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
      .catch((e) => setError(e))
      .finally(() => {
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  let jsx;

  if (loading) {
    jsx = <h2>Loading...</h2>;
  } else {
    if (error != null) {
      jsx = <h2>Error Loading Data!</h2>;
    }
  }

  return (
    <>
      <h1>User List</h1>
      {jsx}
      <ul>
        {user.map((user) => (
          <Users key={user.id} name={user.name} />
        ))}
      </ul>
    </>
  );
}

export default App;
