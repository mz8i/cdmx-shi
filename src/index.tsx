import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import App from './App';
import { DataProvider } from './data/data-context';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <DataProvider dataset="cdmx">
                <DataProvider dataset="alcaldias">
                    <DataProvider dataset="colonias">
                        <App />
                    </DataProvider>
                </DataProvider>
            </DataProvider>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
