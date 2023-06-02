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
    <main className="w-screen max-w-screen min-h-screen max-h-screen bg-slate-100 grid place-content-center items-center p-10 gap-10 font-jakarta">
      <div
        id="chart-container"
        className="w-full h-full bg-white p-8 rounded-lg relative"
      >
        <h1 id="title" className="text-2xl font-medium mb-10">
          United States GDP
        </h1>
        {dataset ? <Chart dataset={dataset} /> : null}
      </div>
    </main>
  );
}

export default App;
