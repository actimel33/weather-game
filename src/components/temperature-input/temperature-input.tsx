import { ITemperatureInputProps } from './types';

export default function TemperatureInput({ inputProps, cityName, labelProps, containerProps }: ITemperatureInputProps) {
  return (
    <div {...containerProps} className="mb-4 relative">
      <input
        type="number"
        className="border rounded p-2 w-full text-center text-yellow-950 font-medium inputField mr-8 border-2"
        {...inputProps}
      />

      <label
        htmlFor={inputProps.id}
        className="label text-center text-yellow-950 font-medium absolute w-auto left-3 -top-3 bg-white px-2 opacity-75 hover:cursor-text "
        {...labelProps}
      >
        {cityName}
      </label>
    </div>
  );
}
