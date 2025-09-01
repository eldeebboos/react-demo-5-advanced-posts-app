export default function FormGroup({ children, error: errorMessage }) {
  return (
    <div className={`form-group ${errorMessage ? "error" : ""}`}>
      {children}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}
