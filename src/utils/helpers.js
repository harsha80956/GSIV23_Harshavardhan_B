export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatTime = (runtime) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}H ${minutes}M`;
};

// Add more utility functions as required.
