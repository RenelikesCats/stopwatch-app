import {useState, useRef, useEffect} from "react";

{
    /* Als je dit leest, Hallo! :) */
}

export default function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
            return;
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, [isRunning]);

    const handleStartStop = () => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
    };

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const ms = Math.floor((milliseconds % 1000) / 10);

        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}:${ms.toString().padStart(2, "0")}`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                    Stopwatch
                </h1>
                <div className="text-4xl font-mono text-center mb-8 text-gray-700 dark:text-gray-200">
                    {formatTime(time)}
                </div>
                <div className="flex justify-center gap-4">
                    {/* start van conditional rendering voor button start/pause */}

                    {isRunning ? (
                        <button
                            onClick={handlePause}
                            className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white px-6 py-3 rounded-md"
                        >
                            Pause
                        </button>
                    ) : (
                        <button
                            onClick={handleStartStop}
                            className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-6 py-3 rounded-md"
                        >
                            Start
                        </button>
                    )}

                    {/* einde van conditional rendering voor button start/pause */}

                    <button
                        onClick={handleReset}
                        className="bg-red-500 hover:bg-red-700 cursor-pointer text-white px-6 py-3 rounded-md"
                    >
                        Reset
                    </button>
                </div>
                <p className=" mt-5 text-center text-sm text-gray-300 dark:text-gray-600">
                    Made by Rene :)
                </p>
            </div>
        </div>
    );
}