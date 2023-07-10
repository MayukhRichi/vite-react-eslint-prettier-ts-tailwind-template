import { ErrorBoundary } from "react-error-boundary";

function Header() {
  return (
    <h1 className="m-8 text-3xl font-bold text-sky-500">
      vite-react-eslint-prettier-ts-tailwind-template
    </h1>
  );
}

function FaultyComponent() {
  throw new Error("Error 503: Service Unavailable");
  return <h2>Hello React</h2>;
}

function App() {
  const FallbackComponent = ({ error }: { error: Error }) => {
    return (
      <>
        <pre style={{ color: "red" }}>{error.message}</pre>
        <a href="/">
          <button type="button" className="danger-button m-4">
            Try Again
          </button>
        </a>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      <ErrorBoundary
        FallbackComponent={FallbackComponent}
        onError={(error: Error, info: { componentStack: string }) => {
          console.log(error.message, info.componentStack);
        }}
      >
        <FaultyComponent />
      </ErrorBoundary>
    </div>
  );
}

export default App;
