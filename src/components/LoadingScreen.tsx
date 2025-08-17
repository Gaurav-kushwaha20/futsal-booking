const LoadingScreen = () => {
    return (
        <div className="h-screen flex  items-center justify-center bg-white/80 backdrop-blur-md">
            {/* Spinner */}
            <div className="flex flex-col items-center justify-center">

                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />

                {/* Optional message */}
                <p className="mt-4 text-gray-700 text-lg font-medium">Loading, please wait...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
