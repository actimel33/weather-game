import { memo } from 'react';
import { motion } from 'framer-motion';
import { slideAnimation } from '../../helpers/motion';
import dictionary from '../../helpers/dictionary.json';

const { USER_GUESS_TEXT, ACTUAL_TEMPERATURE_TEXT } = dictionary;

const Answer = ({
  userAnswer,
  actualTemp,
  cityName,
  guessed,
}: {
  userAnswer: number;
  actualTemp: number;
  cityName: string;
  guessed: boolean;
}) => {
  return (
    <motion.div {...slideAnimation('up')}>
      <div className="bg-blue-50 p-2 mb-4 opacity-75 flex items-center justify-between font-bold rounded">
        <p className="text-gray-600">
          <span className="text-2xl text-yellow-950">{cityName}:&nbsp;</span>
          <span className="text-xl text-gray-500">
            {USER_GUESS_TEXT}
            {userAnswer}℃&nbsp;
          </span>
          <span className="text-xl text-gray-500">
            {ACTUAL_TEMPERATURE_TEXT}
            {actualTemp}℃&nbsp;
          </span>
        </p>
        {guessed && <div className="text-green-500 font-bold ml-1">&#10003;</div>}
        {!guessed && <div className="text-red-500 font-bold ml-1">X</div>}
      </div>
    </motion.div>
  );
};

export default memo(Answer);
