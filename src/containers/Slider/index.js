import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // sort by date
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  // remove the blank space
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);
  
    // clear interval on unmount
    return () => clearInterval(interval);
  }, [byDateDesc]);

  // Log the events data for debugging
  console.log("Events data:", byDateDesc);

  const handleRadioChange = (idx) => {
    setIndex(idx); // Mettre à jour l'index en fonction du bouton radio sélectionné
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.id || `${event.title}-${event.date}`} // Utiliser id ou combinaison unique
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
          {index === idx && ( // only display the dots if the event is displayed
            <div className="SlideCard__paginationContainer">
              <div className="SlideCard__pagination">
                {byDateDesc.map((paginationEvent, radioIdx) => (
                  <input
                    key={paginationEvent.id || `${paginationEvent.title}-${paginationEvent.date}`} // Utiliser id ou combinaison unique
                    type="radio"
                    name="radio-button"
                    checked={index === radioIdx} // Mettre à jour la condition pour le checked
                    onChange={() => handleRadioChange(radioIdx)} // Gestionnaire d'événements pour changer l'index
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Slider;
