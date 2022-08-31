import React from "react";
import "./App.css";

function App() {
  const url = "http://localhost:3000/data/api.json";

  const [logos, setLogos] = React.useState([]);

  const loadLogos = async () => {
    try {
      const res = await fetch(url).then(res => res.json());

      const logos = res.data.sort(
        (a, b) => b.source_items?.audience_size - a.source_items?.audience_size
      );
      console.log("logos", logos);
      setLogos(logos);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    loadLogos();
  }, []);

  return (
    <div className="main">
      <div className="header">Choose a Condé Nast brand's audience:</div>

      <div className="grid-container">
        {logos.map((logo, index) => (
          <div className="column" key={`${logo.source_items?.id}-${index}`}>
            <img
              src={logo.social_media_pages?.picture}
              alt={logo.social_media_pages?.name}
            />
            <div className="overlay">{logo.source_items?.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
