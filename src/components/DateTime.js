import React, { useState, useEffect } from 'react';

export const DateTime = ({ tasks }) => {
    const [dateTime, setDateTime] = useState(new Date());

    const timeComp = (first, second) =>
    {
        first=first.toLocaleTimeString();
        var splitFirst=first.split(":");
        var splitSecond=second.split(":");
        if(splitFirst[0] > splitSecond[0])
            return second;
        else if(splitFirst[0] === splitSecond[0] && splitFirst[1] > splitSecond[1])
            return second;
        else
            return first;
    }

    useEffect(() => {
        const id = setInterval(() => setDateTime(new Date()), 1000);
        return () => {
            clearInterval(id);
        }
    }, []);

    return (
        <div>
            {tasks.filter((task) => task.day === timeComp(dateTime,task.day)).map(filteredTask => (
            //<h5>{`${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`}</h5>
            <h5>{`${filteredTask.id} ${filteredTask.day}`}</h5>
            ))}
        </div>
    );

}