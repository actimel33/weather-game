import { ITemperatureInputProps } from './types';

export default function TemperatureInput({ inputProps, city, labelProps, containerProps }: ITemperatureInputProps) {
  return (
    <div {...containerProps} className="mb-4 relative">
      <input type="number" className="border rounded p-2 w-full text-center text-gray-400 inputField" {...inputProps} />
      <label
        htmlFor={inputProps.id}
        className=" text-center text-gray-500 absolute top-2 md:w-1/3 sm:w-auto left-1/3  label  transition-all ease-out duration-300"
        {...labelProps}
      >
        {city.name}
      </label>
    </div>
  );
}
