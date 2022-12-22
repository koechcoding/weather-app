import React from "react";

const WeatherForm: React.FC<{ onSubmit: (city: string) => void }> = ({ onSubmit }) => {
  const [error, setError] = React.useState("");
  const cityInputRef = React.useRef<HTMLInputElement>(null);

  const onSubmitForm = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!cityInputRef.current?.value) {
        setError("Please enter a city");
      } else {
        onSubmit(cityInputRef.current.value);
      }
    },
    [cityInputRef, onSubmit]
  );

  return (
    <form onSubmit={onSubmitForm}>
      <label htmlFor="city">City:</label>
      <input type="text" id="city" name="city" ref={cityInputRef} />
      {error && <p>Error: {error}</p>}
      <button type="submit">Get Weather</button>
    </form>
  );
};

export default WeatherForm;