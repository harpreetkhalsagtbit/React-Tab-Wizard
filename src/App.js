import React, { Fragment } from 'react';
import Wizard, { Steps, Step } from "./Wizard";

import Button from "./Commons/Button";
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Fragment>
                <div className="wizard-container">
                    <Wizard>
                        <Steps
                            header={({ title, show, isActive, isValid }) => {
                                return (
                                    <Button
                                        disabled={!isActive && !isValid}
                                        className={
                                            "nav-buttons btn-primary btn-large " +
                                            (isActive
                                                ? "isActive"
                                                : "" + (!isValid ? "nav-disabled" : ""))
                                        }
                                        onClick={show}
                                    >
                                        {title}
                                    </Button>
                                );
                            }}
                            next={({ next, isValid }) => {
                                return (
                                    <Button
                                        disabled={!isValid}
                                        className={
                                            "btn btn-primary btn-large" +
                                            (!isValid ? " btn-disabled" : "")
                                        }
                                        onClick={next}
                                    >
                                        Next
                                    </Button>
                                );
                            }}
                            previous={({ previous }) => {
                                return (
                                    <Button
                                        className="btn btn-primary btn-large"
                                        onClick={previous}
                                    >
                                        Previous
                                    </Button>
                                );
                            }}
                        >
                            <Step
                                title={"Upload file(s)"}
                                render={({ update, data }) => {
                                    // return <UploadForm update={update} data={data} entities={this.props.entities.entities} listEntityValue={this.props.listEntityValue}/>;
                                    return <div>Upload Form</div>
                                }}
                            />
                            <Step
                                title={"Common Fields"}
                                render={({ update, data }) => {
                                    // return <CommonForm update={update} data={data}/>;
                                    return <div>Common Form</div>
                                }}
                            />
                            <Step
                                title={"Individual Forms"}
                                render={({ update, data }) => {
                                    // return <IndividualForms update={update} data={data} />;
                                    return <div>Individual</div>
                                }}
                            />
                            <Step
                                title={"Generate"}
                                render={({ update, data }) => {
                                    // return <Generate update={update} data={data} />;
                                    return <div>Generate Form</div>
                                }}
                            />
                        </Steps>
                    </Wizard>
                </div>
            </Fragment>

      </header>
    </div>
  );
}

export default App;
