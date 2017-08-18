import React from 'react';

import ConstraintsForm from '../constraints/ConstraintsForm';

import './Home.css';
import Results from "../results/Results";

const Home = () => (
    <div className="Home">
        <div className="Home-content">
            <ConstraintsForm/>
            <Results/>
        </div>
    </div>
);

export default Home;