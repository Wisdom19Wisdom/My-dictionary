import React from 'react'

const Phonetics = ({ mean }) => {
    console.log(mean);
  return (
    <div>
      {mean.map(values => (
        <div key={values.phonetic}>
            <p>{values.phonetic}</p>
        </div>
      ))}
    </div>
  )
}

export default Phonetics
