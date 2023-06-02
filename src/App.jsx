import Chart from "./components/Chart";
import { useEffect, useState } from "react";

function App() {
  const [dataset, setDataset] = useState(null);

  const getDataset = async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
    );
    const data = await response.json();
    setDataset(data);
  };

  useEffect(() => {
    getDataset();
  }, []);

  return (
    <main className="w-screen max-w-screen min-h-screen max-h-screen bg-neutral-100 flex flex-col justify-center items-center p-10 gap-10">
      <h1 className="text-2xl">United States GDP</h1>
      {dataset ? <Chart dataset={dataset} /> : null}
    </main>
  );
}

export default App;
