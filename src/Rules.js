import React from 'react';
import './index.css';

export class Rules extends React.Component {
    //Rules go here
    render() {
        return (
            <div>
                <h2>Rules:</h2>

                <ul>
                    <li>Anything with 2 or 3 neighbors it lives.</li>
                    <li>Anything with less than 2 neighbors dies (simulates underpopulation)</li>
                    <li>Anything with more than 3 neighbors dies (simulates overpopulation)</li>
                    <li>Anything dead that has <strong>exactly</strong> 3 neighbors, will come to life (simulates reproduction)</li>
                    <li>Anything alive goes on to next generation</li>
                </ul>
            </div>
        )
    }

}



