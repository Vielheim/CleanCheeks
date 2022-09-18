import { capitalize } from 'lodash';
import { GrFormCheckmark, GrFormClose } from 'react-icons/gr';

const StyledUtility = ({ utility, presentUtilities }) => {
  const isPresent = presentUtilities.includes(utility.toUpperCase());
  const icon = isPresent ? <GrFormCheckmark /> : <GrFormClose />;
  const cssClass = isPresent ? '' : 'non-exist-utility';

  return (
    <div className={cssClass}>
      {icon}
      {`  ${capitalize(utility)}`}
    </div>
  );
};

export default StyledUtility;
