import React from 'react';
import { Link } from 'react-router-dom';

const LoginToastBody = () => {
  return (
    <div>
      Please <Link to="/">login</Link> to rate, favourite or blacklist toilets!
    </div>
  );
};

export default LoginToastBody;
