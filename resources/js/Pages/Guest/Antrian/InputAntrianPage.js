import React from "react";
import ReactDOM from 'react-dom';

import {getPoli,submitAntrian} from "../../../Services/GuestService";
import {showError} from "../../../Components/Toaster";

class InputAntrianPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            poli : [], current_poli : null, doctor : [],
            loading : true, show_doctor : false,
        };
        this.showDoctor = this.showDoctor.bind(this);
    }
    componentDidMount(){
        this.loadPoli();
    }
    showDoctor(item = null) {
        this.setState({show_doctor:! this.state.show_doctor, current_poli:null,doctor:[]});
        if (item !== null) {
            this.setState({current_poli:item,doctor:item.meta.doctors});
        }
    }
    async loadPoli(){
        this.setState({loading:true});
        try {
            let response = await getPoli();
            if (response.data.params === null) {
                showError(response.data.message);
            } else {
                this.setState({poli:response.data.params});
            }
        } catch (e) {
            showError(e.response.data.message);
        }
        this.setState({loading:false});
    }
    render() {
        return (
            <>
                <div className="container" style={{marginTop:'50px',marginBottom:'50px'}}>
                    <div className="card">
                        <div className="card-header bg-primary">
                            <h3 className="card-title text-white text-center mb-0">ANTRIAN</h3>
                        </div>
                        <div className="card-body">
                            <div className="card-header bg-primary mb-5">
                                <h3 className="card-title text-white mb-0">
                                    {this.state.current_poli !== null &&
                                        <button onClick={()=>this.showDoctor(null)} className="btn btn-info"><i className="fas fa-chevron-left"/></button>
                                    }
                                    PILIH POLI
                                </h3>
                            </div>
                            <div className="row">
                                {
                                    this.state.current_poli === null ?
                                        this.state.poli.map((item,index)=>
                                            <div key={index} className="col-md-4">
                                                <div className="card" onClick={()=>this.showDoctor(item)}>
                                                    <div className="card-body">
                                                        <div style={{weight:'bold',textAlign:'center',fontSize:'20px'}}>
                                                            {item.label}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        :
                                        this.state.doctor.map((item,index)=>
                                            <div key={index} className="col-md-4">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div style={{weight:'bold',textAlign:'center',fontSize:'20px'}}>
                                                            {item.label}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default InputAntrianPage;

if (document.getElementById('antrian-input')){
    ReactDOM.render(<InputAntrianPage/>, document.getElementById('antrian-input'));
}
