import React from 'react';

import ConstraintsForm from '../constraints/ConstraintsForm';

import './Home.css';
import Results from "../results/Results";

const Home = () => (
    <div className="Home">
        <div className="Home-content">
            <h1>The Date Resolver</h1>
            <div style={{width: 500}}>
                <h4>Add some rules to figure out the best available date for your event.</h4>
                <p>Some example rules you can try out:</p>
                <ul>
                    <li>The day must be after July 19</li>
                    <li>The day can not fall on a Tuesday</li>
                    <li>The day can not be August 24</li>
                </ul>
            </div>
            <ConstraintsForm/>
            <Results/>
        </div>
    </div>
);

export default Home;