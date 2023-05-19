import { CircularProgress, Slide, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cityName, setCityName] = useState("london");
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=fdaecd249fcf66851dc295cc8bd13804&units=metric`
    )
      .then((res) => {
        if (res.status === 200) {
          error && setError(false);
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [cityName, error]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setCityName(e.target.value);
      setInputText("");
    }
  };

  return (
    <div className="w-[100vw] min-h-[100vh] flex justify-center items-center flex-col bg-gray-300">

      {!loading ? (
        <>
          <TextField
            variant="filled"
            label="Search location"
            className="bg-[#ffffffbf]"
            error={error}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleSearch}
          />
          <h1 className="mt-[2rem] text-black text-[3rem]">{data.name}</h1>
          <div className="flex gap-[10px] items-center mx-[1rem]">
            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt=""
            />
            <h1 className="text-xl font-medium">{data.weather[0].main}</h1>
          </div>

          <h1 className="text-[3rem] text-black">{data.main.temp.toFixed()} °C</h1>

          <Slide direction="right" timeout={800} in={!loading}>
            <div className="mt-[2rem] flex items-center justify-center gap-[25px]">
              <div className="p-[1rem] text-white font-medium rounded-xl bg-[#000000bf] w-[220px] items-center flex gap-[10px] duration-200 hover:scale-110">
                <p>Humidity</p>
                <h1>{data.main.humidity.toFixed()}%</h1>
              </div>

              <div className="p-[1rem] text-white font-medium rounded-xl bg-[#000000bf] w-[220px] items-center flex gap-[10px] duration-200 hover:scale-110">
                <p>Wind</p>
                <h1>{data.wind.speed.toFixed()} km/h</h1>
              </div>

              <div className="p-[1rem] text-white font-medium rounded-xl bg-[#000000bf] w-[220px] items-center flex gap-[10px] duration-200 hover:scale-110">
                <p>Feels Like</p>
                <h1>{data.main.feels_like.toFixed()} °C</h1>
              </div>
            </div>
          </Slide>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default App;