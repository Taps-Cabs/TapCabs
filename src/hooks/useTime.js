import { useEffect, useState } from "react";

export default function useTime({ date }) {

    const [realTime, setRealTime] = useState(null)
    const [timeLoading, setLoading] = useState(false);


    function formattedDate(date) {
        const formattedDate = date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        });

        return formattedDate;
    }
    const finalDate = formattedDate(date)

    function formattedTime(date) {
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        });
        return formattedTime;
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setLoading(false);
            const date = new Date();
            const time = formattedTime(date);
            setRealTime(time);
        }, 1000);

        setLoading(true);
        return () => clearInterval(intervalId);
    }, []);

    return ({ finalDate, realTime, timeLoading })
}
