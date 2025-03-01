import React, {Component} from "react";

class CountDownTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {count:10} //initial ccountdown value
    }

    // start the timer when component mounts

    componentDidMount(){
        this.timer = setInterval(()=> {
            this.setState((prevState) => ({count: prevState.count-1}))
        }, 1000);
    }

    // stop the timer when count reaches 0

    componentDidUpdate() {
        if(this.state.count === 0) {
            clearInterval(this.timer);
        }
    }

    // clear timer when component is removed

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div>
                <h1>Demo for Count Down Timer (class component)</h1>
                <h2> {this.state.count>0 ? this.state.count : "Time's up!"} </h2>
            </div>
        )
    }
}

export default CountDownTimer;