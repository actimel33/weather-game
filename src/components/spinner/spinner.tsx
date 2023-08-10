import { memo } from 'react';
import loader from '../../images/sun.png';

const Spinner = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <>
      {isLoading && (
        <div
          className="animate-spin"
          style={{
            backgroundImage: `url(${loader})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '50px',
            height: '50px',
          }}
        />
      )}
    </>
  );
};

export default memo(Spinner);
