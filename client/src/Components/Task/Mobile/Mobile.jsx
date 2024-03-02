import { useState } from 'react';
import './Mobile.css'
import { selectMobilePlatform } from '../../../data/createTask';

function Mobile() {
  const [ mobile, setMobile ] = useState('')

  return (
    <div className="mobile">
      <label htmlFor="">Select Type of Account</label>
      <select onChange={(e) => setMobile(e.target.value)}>
        <option value="">-- SELECT PLATFORM --</option>
        {selectMobilePlatform.map((item, idx) => (
          <option key={idx} value={item.code}>
            {item.platform}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Mobile