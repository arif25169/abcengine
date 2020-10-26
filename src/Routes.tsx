import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import styled from 'styled-components';
import {Helmet} from 'react-helmet';
import StepOne from './pages/StepOne';
import StepTwo from './pages/StepTwo';


const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function () {
    return (
        <BrowserRouter>
            <Helmet
                titleTemplate="%s - ABC Company"
                defaultTitle="ABC Company"
            >
                <meta name="description" content="This is ABC ENGINE"/>
            </Helmet>
            <AppWrapper>
                <Switch>
                    <Route component={StepOne} exact path="/"/>
                    <Route component={StepTwo} path="/secondstep"/>
                </Switch>
            </AppWrapper>
        </BrowserRouter>
    )
}
