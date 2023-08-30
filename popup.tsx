import { useState } from "react";
import "./styles.css"

function IndexPopup() {

  const [buttontext, setButtontext] = useState("Where Am I")
  const [locaInfo, setLocaInfo] = useState("...")
  const [ip, setip] = useState("")

  async function fetchLocationInfo() {
    setButtontext("Loading...")
    
    await fetch("https://api.ipify.org?format=json")
    .then(res => res.json())
    .then(resjson => {
      setip(resjson.ip)
    })

    await fetch(`https://ipinfo.io/${ip}/json?token=${$ipinfo_io_api_token}`)
      .then(response => response.json())
      .then(jsonResponse => {
        setButtontext("DONE !!")
        setLocaInfo(`our country is ${jsonResponse.country} and city is ${jsonResponse.city}`)
      });


  }

  const MainBox: React.FC = () => {
    return (
      <div
        style={{
          width: "500px",
          height: "500px"
        }}
        className="flex justify-center flex-col items-center h-screen bg-gray-200">
        <div className="text-center	w-1/2 p-4 text-xl font-bold text-deep-blue bg-white border border-black rounded-lg shadow-lg flex flex-col gap-2 mb-4">
          {locaInfo}
        </div>
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col justify-center items-center">
          <button onClick={fetchLocationInfo} className="text-3xl py-2 px-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600">{buttontext}</button>
        </div>
      </div>
    );
  };

  return (
    <MainBox />
  )
}

export default IndexPopup