import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { InputContext } from '../App';
import MeaningList from './MeaningList';
import Phonetics from './Phonetics';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL= "https://api.dictionaryapi.dev/api/v2/entries/en"


const ResultList = () => {

    const { inputValue } = useContext(InputContext)
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async (param) => {
        try{
            setLoading(true);
            const res = await axios(`/${param}`)
            setResponse(res.data);
            setError(null);
        }catch (err){
            setError(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
      if(inputValue.length){
        fetchData(inputValue)
      }
    }, [inputValue]);


    if(loading){
        return (
          <div className='container flex flex-col space-y-3 animate-pulse p-1 mx-auto max-w-5xl'>
            <div className='h-8 bg-gray-300 mt-5 rounded-md'></div>
            <div className='h-[200px] bg-gray-300 mt-5 rounded-md'></div>
          </div>
        )
    }
    if(error){
      toast ('No Definitions found 😓');
      return <h1 className='text-center mt-10 font-semibold text-gray-500'>No Definitions found 😓</h1>
    }


  return (
    <div className='container mx-auto p-4 max-w-2xl'>
      <ToastContainer />
      {  response && (
          <div>
            <p className='text-2xl font-bold mt-4'>Meaning & Definisions:</p>
            <Phonetics mean={response}/>
            <MeaningList mean={response}/>
          </div>
      )}
    </div>
  )
}

export default ResultList
