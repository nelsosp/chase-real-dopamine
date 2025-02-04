import "./Clock.css";

const Clock = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  // Format hours in 12-hour format
  const formattedHour = hours % 12 === 0 ? 12 : hours % 12;

  // Format minutes to ensure two digits (e.g., "05" instead of "5")
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Determine AM or PM
  const amPm = hours >= 12 ? "PM" : "AM";

  // Combine everything into a string
  const formattedTime = `${formattedHour}:${formattedMinutes} ${amPm}`;

  return <div className="clock">{formattedTime}</div>;
};

export default Clock;
