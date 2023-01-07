import { useState } from 'react';
import { login } from './utils';
import './index.css';

function App() {
  const [data, setData] = useState({
    email: '',
    password: '',
    isResquesting: false,
    errorMessage: '',
  })

  const passwordArray = [...data.password];

  const handleDisabled = () => {
    if(data.email === '' || passwordArray.length < 6 || data.isResquesting === true) {
      return true;
    }else {
      return false
    }
  }

  const handleChange = (e) => {
    setData((prev) => {
      const {id, value} = e.target;
      const newData = {...prev, [id]: value};
      return newData;
    });
  }

  const handleSubmit = () => {
    setData(
      (prev) => {
        const newData = {...prev, isResquesting: true};
        return newData;
      }
    );
    login(data)
    .then(
      () => {
        alert('Login realizado com sucesso.')
      }
    )
    .catch( 
      (err) => {
        setData(
          (prev) => {
            const newData = {...prev, errorMessage: err.message};
            return newData;
          }
        );
      }
    )
    .finally(
      () => {
        setData(
          (prev) => {
            const newData = {...prev, isResquesting: false};
            return newData;
          }
        );
      }
    );
    setData(
      (prev) => {
        const newData = {...prev, errorMessage: ''};
        return newData;
      }
    );
  }

  return (
    <div className='wrapper'>
      <div className='login-form'>
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        <div className='errorMessage'>{data.errorMessage}</div>
        <div className='row'>
          <label htmlFor={'email'}>Email</label>
          <input id={'email'} type={'email'} autoComplete='off' onChange={(e) => handleChange(e)}/>
        </div>
        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input id={'password'} type={'password'} onChange={(e) => handleChange(e)}/>
        </div>

        <div className='button'>
          <button onClick={handleSubmit} disabled={handleDisabled()}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default App;
