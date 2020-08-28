import React from 'react';
import './index.css';

export class Rules extends React.Component {
    //Rules go here
    render() {
        return (
            <div className ='rules'>
                <h2>Rules:</h2>
                <ul>
                    <li>Live cells with 2 or 3 neighbors, lives and moves on to next generation.</li>
                    <li>Live cells with less than 2 neighbors, dies (simulates underpopulation).</li>
                    <li>Live cells with more than 3 neighbors dies (simulates overpopulation).</li>
                    <li>Dead cells with <strong>exactly</strong> 3 neighbors, will come to life (simulates reproduction).</li>
                </ul>
            </div>
        )
    }

}



