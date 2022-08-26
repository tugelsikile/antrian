import React from "react";
import ReactDOM from 'react-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import {currentAntrian, getPoli} from "../../../Services/GuestService";
import {showError} from "../../../Components/Toaster";
import {Toaster} from "react-hot-toast";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(0),
        },
    },
}));

class ScreenAntrian extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            current_count : 0, intervalId : null,
            poli : []
        };
        this.timer = this.timer.bind(this);
    }
    componentDidMount() {
        var intervalId = setInterval(() => this.timer(),100);
        this.setState({intervalId});
        this.loadPoli();
    }
    timer(){
        let newCount = this.state.current_count + 1;
        if (newCount >= 30) {
            this.setState({current_count:0});
            this.loadPoli();
        } else {
            this.setState({current_count:newCount});
        }
    }
    async loadPoli(){
        try {
            let response = await getPoli();
            if (response.data.params === null) {
                showError(response.data.message);
            } else {
                this.setState({poli:response.data.params}, ()=>{
                    this.state.poli.map((item,index)=>{
                        this.loadCurrentAntri(item);
                    });
                });
            }
        } catch (e) {
            showError(e.response.data.message);
        }
    }
    async loadCurrentAntri(item){
        let poli = this.state.poli;
        try {
            let response = await currentAntrian({poli:item.value});
            if (response.data.params === null){
                showError(response.data.message);
            } else {
                let poliIndex = poli.findIndex((a) => a.value === item.value);
                if (poliIndex >= 0) {
                    poli[poliIndex].meta.antrian = response.data.params;
                    this.setState({poli});
                }
            }
        } catch (e) {
            showError(e.response.data.message);
        }
    }
    render() {
        return (
            <>
                <Toaster position="top-center"/>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title text-center mb-0">
                            ANTRIAN POLI
                            <CircularProgress style={{float:'right'}} variant="determinate" value={ (this.state.current_count / 30) * 100 } />
                        </h3>
                    </div>
                </div>
                <div className="row">
                    {this.state.poli.map((item,index)=>
                        <div key={index} className="col-md-4">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title mb-0 text-center">POLI {item.label}</h3>
                                </div>
                                <div className="card-body text-center" style={{fontSize:'70px',fontWeight:'bold',color:'green'}}>
                                    &nbsp; {typeof item.meta.antrian !== 'undefined' && item.meta.antrian } &nbsp;
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    }

}

export default ScreenAntrian;

if (document.getElementById('antrian-screen')){
    ReactDOM.render(<ScreenAntrian/>, document.getElementById('antrian-screen'));
}
