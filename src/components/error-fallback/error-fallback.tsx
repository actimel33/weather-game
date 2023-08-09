import Button from '../button/button';

export function fallbackRender({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center pt-4  flex-col">
      <div className="bg-white p-6 rounded shadow-lg h-96 min-h-full max-w-xs flex flex-col justify-around">
        <h1>Sorry.. there was an error</h1>
        <p>{error.message}</p>
        <Button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold" onClick={resetErrorBoundary}>
          Retry
        </Button>
      </div>
    </div>
  );
}
