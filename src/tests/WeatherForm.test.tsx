import React from "react";
import { render, fireEvent } from "@testing-library/react";
import WeatherFormfrom "../WeatherForm";

describe("WeatherForm", () => {
   it("should call the onSubmit callback when the form is submitted", () => {
    const onSubmit = jest.fn();
    const { getByLabelText, getByText } = render(<WeatherForm onSubmit={onSubmit} />);
    const cityInput = getByLabelText(/city/i) as HTMLInputElement;
    const submitButton = getByText(/get weather/i);
    fireEvent.change(cityInput, { target: { value: "London" } });
    fireEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalledWith("London");
   })
   it("should display the city, temperature, and description data", () => {
    const { getByText } = render(
      <WeatherData
        city="London"
        temperature={20}
        description="Mostly cloudy"
      />
    );
  
    expect(getByText(/london/i)).toBeInTheDocument();
    expect(getByText(/20/i)).toBeInTheDocument();
    expect(getByText(/mostly cloudy/i)).toBeInTheDocument();
  });
})