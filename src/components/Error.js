import '../styles/Error.css';

const Error = ({ message }) => {
  return (
    <div className="error">
      <span className="error__message">{message}</span>
    </div>
  )
}

export default Error;