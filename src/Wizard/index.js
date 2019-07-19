import React, { Fragment } from "react";

const Wizard = ({ children }) => {
  return children;
};

/**
 * Keep track for each Step
 * Each step will inform whether next operation can be performed or not
 * Each step will have its own local state
 * Wizard perform operation base on the validation of local state of active step
 * By default all steps would be disabled or invalid as only previous step state
 * will determine the next operation to be followed
 */
export class Steps extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeStepIndex: 0,
      formData: {
        0:{
          isValid: true
        },
        1:{
          isValid: true
        },
        2:{
          isValid: true
        },
        3:{
          isValid: true
        }

      }
    };
    this.show = this.show.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.update = this.update.bind(this);
    this.children = React.Children.toArray(this.props.children);
  }
  show(step, index) {
    return () => {
      if (
        this.state.formData[this.state.activeStepIndex] &&
        this.state.formData[this.state.activeStepIndex].isValid
      ) {
        this.setState(
          {
            activeStepIndex: index
            //   activeStep:this.props.children[index]
          },
          () => {
            console.log("click called", this.state.activeStepIndex, index);
          }
        );
      } else {
        console.log("No show");
      }
    };
  }
  next(index, isValid) {
    const steps = this.children;
    return () => {
      if (this.state.formData[this.state.activeStepIndex]) {
        if (index + 1 < steps.length) {
          this.setState(
            {
              activeStepIndex: index + 1
            },
            () => {
              console.log("click called", this.state.activeStepIndex, index);
            }
          );
        }
      } else {
        console.log("no Next");
      }
    };
  }
  previous(index) {
    return () => {
      if (index - 1 >= 0) {
        this.setState(
          {
            activeStepIndex: index - 1
          },
          () => {
            console.log("click called", this.state.activeStepIndex, index);
          }
        );
      }
    };
  }
  update(stepIndex, data) {
    if (stepIndex != null) {
      this.setState((prevState, prevProps) => {
        prevState.formData[stepIndex] = data;
        return {
          formData: Object.assign({}, prevState.formData)
        };
      });
    } else {
      this.setState((prevState, prevProps) => {
        return {
          activeStepIndex: data.activeStepIndex
        };
      });
    }
  }

  render() {
    return (
      <div className="wizard">
        <div className="wizard-header">
          {this.children.map((element, index) => {
            return (
              <Fragment key={index}>
                {this.props.header({
                  ...element.props,
                  isActive: index === this.state.activeStepIndex ? true : false,
                  show: this.show(element, index, this.state.isValid),
                  isValid:
                    (this.state.formData[index] &&
                      this.state.formData[index].isValid) ||
                    (this.state.formData[index - 1] &&
                      this.state.formData[index - 1] &&
                      this.state.formData[index - 1].isValid) ||
                    false
                })}
              </Fragment>
            );
          })}
        </div>
        <div className="wizard-body">
          {this.children[this.state.activeStepIndex].props.render({
            update: this.update,
            data: this.state.formData || {}
          })}
        </div>
        <div className="wizard-footer">
          {this.props.previous({
            previous: this.previous(this.state.activeStepIndex)
          })}
          {this.props.next({
            next: this.next(this.state.activeStepIndex),
            isValid:
              this.state.formData[this.state.activeStepIndex] &&
              this.state.formData[this.state.activeStepIndex].isValid
          })}
        </div>
      </div>
    );
  }
}

export const Step = ({ children, ...props }) => {
  return children;
};

export default Wizard;
