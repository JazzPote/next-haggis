import { useState, useEffect } from "react";
import axios from "axios";

function homePage() {
  const [count, setCount] = useState();
  const [error, setError] = useState();
  const [countUpdated, setCountUpdated] = useState(false);

  useEffect(() => {
    if (count && !countUpdated) {
      return;
    }
    async function getCount() {
      try {
        const {
          data: { count },
        } = await axios.get("/api/count");
        setCount(count);
        setCountUpdated(false);
      } catch (error) {
        console.log({ error });
        setError(error.message);
      }
    }

    getCount();
  });

  const handleIncrementCount = async () => {
    if (!count) {
      return;
    }
    try {
      const { status } = await axios.put("/api/count", { count: count + 1 });
      console.log({ status });
      if (status === 200) {
        setCountUpdated(true);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <h1>Count</h1>
      <p>{error || count || "Waiting for count..."}</p>
      {true && <button onClick={handleIncrementCount}>Increment count</button>}
    </>
  );
}

export default homePage;
