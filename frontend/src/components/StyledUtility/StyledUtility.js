import { capitalize } from 'lodash';
import { GrFormCheckmark, GrFormClose } from 'react-icons/gr';
import styles from './StyledUtility.module.scss';

const StyledUtility = ({ utility, presentUtilities }) => {
  const isPresent = presentUtilities.includes(utility.toUpperCase());
  const icon = isPresent ? <GrFormCheckmark /> : <GrFormClose />;
  const cssClass = isPresent ? '' : styles['non-exist-utility'];

  return (
    <div className={cssClass}>
      {icon}
      {`  ${capitalize(utility)}`}
    </div>
  );
};

export default StyledUtility;
