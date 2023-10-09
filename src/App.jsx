import { useEffect, useState, Fragment } from "react";
import { Users } from "./Users";

export default function App() {
  const [list, setList] = useState({ jsx });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

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
        setList(data);
      })
      .catch((err) => setError(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  let jsx;

  if (loading) {
    jsx = <h1>Loading...</h1>;
  } else if (error != null) {
    jsx = <h1>Error loading data!</h1>;
  } else {
    jsx = JSON.stringify(list);
  }

  return (
    <>
      <h1>User List</h1>
      <ul>
        {list.map((item) => {
          return <Fragment key={item.id}>{item.name}</Fragment>;
        })}
      </ul>
    </>
  );
}
