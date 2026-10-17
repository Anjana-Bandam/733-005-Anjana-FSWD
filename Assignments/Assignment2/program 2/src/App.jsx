
import { Component, useState } from "react";

// Error Boundary class component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error caught by Error Boundary:", error);
    console.log("Error details:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong!</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={this.props.onRetry}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Child component that throws an error on button click
function BuggyComponent() {
  const [crash, setCrash] = useState(false);

  if (crash) {
    throw new Error("Button click caused an error!");
  }

  return (
    <div>
      <h2>Child Component</h2>
      <p>Click the button to test the Error Boundary.</p>

      <button onClick={() => setCrash(true)}>
        Throw Error
      </button>
    </div>
  );
}

// Main App
function App() {
  const [resetKey, setResetKey] = useState(0);

  return (
    <div>
      <h1>Error Boundary Demo</h1>

      <ErrorBoundary
        key={resetKey}
        onRetry={() => setResetKey(resetKey + 1)}
      >
        <BuggyComponent />
      </ErrorBoundary>
    </div>
  );
}

export default App;
