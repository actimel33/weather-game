import { memo } from 'react';
import { motion } from 'framer-motion';
import { slideAnimation } from '../../helpers/motion';
import dictionary from '../../helpers/dictionary.json';

const { USER_GUESS_TEXT, ACTUAL_TEMPERATURE_TEXT } = dictionary;

const Answer = ({ userAnswer, actualTemp }: { userAnswer: number; actualTemp: number }) => {
  return (
    <motion.div {...slideAnimation('up')}>
      <p className="text-xl text-gray-600">
        {USER_GUESS_TEXT}
        {userAnswer} ℃
      </p>
      <p className="text-xl text-gray-600">
        {ACTUAL_TEMPERATURE_TEXT}
        {actualTemp} ℃
      </p>
      <hr />
    </motion.div>
  );
};

export default memo(Answer);
