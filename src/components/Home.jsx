import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa'
import { InputContext } from '../App';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MeaningList from './MeaningList';
import Phonetics from './Phonetics';


axios.defaults.baseURL= "https://api.dictionaryapi.dev/api/v2/entries/en"

const home = () => {

  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const {emailId} = useParams();
  const { inputValue, setInputValue } = useContext(InputContext);
  const [response, setResponse] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const userDatas = JSON.parse(localStorage.getItem('userData'));
  const findUser = userDatas.find((user) => user.email === emailId)
  const [clickCount, setClickCount] = useState(0);
  
  const handleInputChange = e => setValue(e.target.value);

  useEffect(() => {
    if (!findUser) {
      navigate('/home');
    }
  }, [findUser, navigate]);

  const handleInputKeyDown = (e) => {
    if(e.key === "Enter"){
      setInputValue(value);
      setValue("");
      handleSearch();
      
    }
  } 

  const handleSubmit = () => {
    setInputValue(value);
    setValue("");
    handleSearch();
  };

  const handleSearch = () => {
    setInputValue(value);
    setValue("");
    setClickCount((prevCount) => prevCount + 1); // Increment click count on each submit
  };

    const fetchData = async (param) => {
        try{
            setLoading(true);
            setResponse(null);
            const res = await axios(`/${param}`);
            console.log(res, 'resssssssss');
            setResponse(res.data);
            setError(null);
        }catch (err){
            setError(true);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
      if(inputValue.length){
        fetchData(inputValue)
      }
    }, [inputValue]);

    useEffect(() => {
      // Redirect to login if click count exceeds 3
      if (!findUser && clickCount >= 3) {
        navigate('/login');
      }
    }, [clickCount, navigate]);


  return (
    <div className='container h-screen'>
      <div className=" max-auto py-8 bg-gray-700">
        {!findUser ?
        <Link to='/login'><button className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-all ml-4'>Log In</button></Link>
        : 
        <Link to='/home'><button className='px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-all ml-4'>Log Out</button></Link> 
        }
      
        <h1 className='text-3xl font-bold text-center text-white'>{!findUser ? "Wisdom" : findUser?.username} Dictionary</h1>
        <p className='text-center mt-1 mb-10 text-slate-300 text-lg'>Find Definitions For Word</p>

        <div className="flex items-center justify-center mt-5">
          <div className="flex border-gray-200 rounded">
            <input type="text" className='px-4 py-2 md:w-80 rounded-l-lg' placeholder='Search...' onChange={handleInputChange} value={value} onKeyDown={handleInputKeyDown}/>
            <button className='text-white p-3 bg-blue-400 rounded-r-lg' onClick={handleSubmit}><FaPaperPlane/></button>
          </div>
        </div>


        {inputValue && (
          <h3 className='text-gray-50 text-center mt-4'>Result for: <span className='text-white font-bold'>{inputValue}</span></h3>
        )}

      </div>
        

      <div className=' mx-auto p-4 max-w-2xl'>
        {response && (
          <div>
              <p className='text-2xl font-bold mt-4'>Meaning & Definisions:</p>
              <Phonetics mean={response}/>
              <MeaningList mean={response}/>
          </div>
        )}
      </div>
      {
        loading 
        && <div className=' flex flex-col space-y-3 animate-pulse p-1 mx-auto max-w-5xl'>
            <div className='h-8 bg-gray-300 mt-5 rounded-md'></div>
            <div className='h-[180px] bg-gray-300 mt-5 rounded-md'></div>
          </div>
      }
      {
        error &&
        <h1 className='text-center mt-10 font-semibold text-gray-500'>No Definitions found 😓</h1>
      }
    </div>
    
  )
}

export default home
