import { useEffect, useState } from "react";
import { Sparkles, Calendar, Zap } from "lucide-react";

export default function FuturePredictions({ userId,onBack, isDarkMode }) {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch(`/api/ai/future-events/${userId}`)
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

  }, [userId]);

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-lg">🔮 Loading your future predictions...</p>
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="text-center py-10">
        <p>No predictions yet</p>
      </div>
    );
  }

  return (
    <div className={`p-8 ${isDarkMode ? "bg-slate-800" : "bg-white"}`}>
        <button
  onClick={onBack}
  className="mb-6 px-4 py-2 bg-gray-500 text-white rounded"
>
  ← Back
</button>

      <div className="flex items-center space-x-3 mb-6">
        <Sparkles className="text-emerald-500 w-8 h-8"/>
        <h2 className="text-3xl font-bold">Your Future Predictions</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {events.map(event => (

          <div
            key={event._id}
            className={`rounded-xl p-6 shadow-lg ${
              isDarkMode ? "bg-slate-700" : "bg-gray-50"
            }`}
          >

            <div className="flex items-center justify-between mb-4">

              <Calendar className="text-emerald-500"/>

              <span className="text-sm font-bold">
                {Math.round(event.probability * 100)}%
              </span>

            </div>

            <h3 className="text-xl font-bold mb-2">
              {event.eventName}
            </h3>

            <p className="text-sm mb-4">
              Expected around {event.expectedMonth}
            </p>

            <button
              onClick={() => generateFutureCart(event._id)}
              className="flex items-center space-x-2 bg-emerald-500 text-white px-4 py-2 rounded-lg"
            >
              <Zap className="w-4 h-4"/>
              <span>Generate Future Cart</span>
            </button>

          </div>

        ))}

      </div>

    </div>
  );

  async function generateFutureCart(eventId){

    const res = await fetch(`/api/ai/future-cart/${eventId}`,{
      method:"POST"
    });

    const data = await res.json();

    alert("Future Cart Generated!");
    console.log(data);
  }

}