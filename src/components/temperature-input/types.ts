import { ICityData } from '../game/types';

export interface ITemperatureInputProps {
  city: ICityData;
  containerProps?: React.InputHTMLAttributes<HTMLDivElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: React.InputHTMLAttributes<HTMLLabelElement>;
}
