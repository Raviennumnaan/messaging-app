import spinner from './assets/spinner.gif';

function Spinner() {
  return (
    <div className='spinner'>
      <img src={spinner} alt='Loading...' />
    </div>
  );
}

export default Spinner;
