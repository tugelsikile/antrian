import React from 'react';
import ReactDOM from 'react-dom';
import PagePreloader from "../../Layouts/PagePreloader";
import TopNavBar from "../../Layouts/TopNavBar";
import LeftNavigation from "../../Layouts/LeftNavigation";
import PageBreadCrumb from "../../Layouts/PageBreadCrumb";
import PageFooter from "../../Layouts/PageFooter";
import {me} from "../../Services/AuthService";
import {showError, showSuccess} from "../../Components/Toaster";
import {crudPoli} from "../../Services/PoliService";
import {callAntrian, crudAntrian} from "../../Services/AntiranService";

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            token : localStorage.getItem('_token'),
            me : null, poli : [],
            current_poli : null, current_antrian : '', antrian : [],
            loadings : {
                page : true,
            }
        };
        this.loadAntrian = this.loadAntrian.bind(this);
        this.callAntrian = this.callAntrian.bind(this);
    }
    componentDidMount() {
        this.loadMe();
        /*const speech = new SpeechSynthesisUtterance();
        speech.text = 'antrian dengan nomor ini sedang dipanggil';
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        console.log(voices);
        const utterThis = new SpeechSynthesisUtterance(speech.text);
        utterThis.lang = 'id-ID';
        utterThis.voice = voices[0];
        synth.speak(utterThis);*/
        //window.speechSynthesis.speak(speech);

    }

    async loadMe(){
        let loadings = this.state.loadings;
        loadings.page = true; this.setState({loadings});
        try {
            let response = await me(this.state.token);
            if (response.data.params === null) {
                showError(response.data.message);
            } else {
                this.setState({me:response.data.params});
                this.loadPoli();
            }
        } catch (e) {
            if (e.response.status === 401) {
                window.location.href = window.origin + '/login';
            }
            showError(e.response.data.message);
        }
        loadings.page = false; this.setState({loadings});
    }
    async loadPoli(){
        let loadings = this.state.loadings;
        loadings.page = true; this.setState({loadings});
        try {
            let response = await crudPoli(this.state.token,{});
            if (response.data.data === null) {
                showError(response.data.message);
            } else {
                this.setState({poli:response.data.data});
            }
        } catch (e) {
            showError(e.response.data.message);
        }
        loadings.page = false; this.setState({loadings});
    }
    async loadAntrian(id_poli, targetAntrian = null){
        let current_poli = id_poli; this.setState({current_poli});
        let loadings = this.state.loadings;
        loadings.page = true; this.setState({loadings});
        try {
            let response = await crudAntrian(this.state.token, {poli:id_poli});
            if (response.data.params === null) {
                showError(response.data.message);
            } else {
                this.setState({antrian:response.data.params});
            }
        } catch (e) {
            showError(e.response.data.message);
        }
        loadings.page = false; this.setState({loadings});
        if (targetAntrian !== null) {
            this.renderCurrentAntrian(targetAntrian);
        }
    }
    async callAntrian(data){
        let loadings = this.state.loadings;
        loadings.page = true; this.setState({loadings});
        try {
            let response = await callAntrian(this.state.token, {nomor_antrian:data.value});
            if (response.data.params === null) {
                showError(response.data.message);
            } else {
                showSuccess(response.data.message);
                this.loadAntrian(response.data.params.meta.poli.value, response.data.params);
                //this.renderCurrentAntrian(response.data.params);
            }
        } catch (e) {
            showError(e.response.data.message);
        }
        loadings.page = false; this.setState({loadings});
    }
    renderCurrentAntrian(target = null){
        let current_antrian = ``;
        if (this.state.antrian.length > 0) {
            let lastAntrian = null;
            if (target !== null) {
                lastAntrian = target;
            } else  {
                this.state.antrian.map((item,index)=>{
                    if (lastAntrian === null) {
                        if (item.meta.call !== null) {
                            lastAntrian = item;
                        }
                    }
                });
            }
            if (lastAntrian !== null) {
                current_antrian = lastAntrian.meta.poli.meta.code +  String(lastAntrian.meta.numbers.poli).padStart(3,'0');
            }
        }
        this.setState({current_antrian});
    }
    render() {
        return (
            <>
                <PagePreloader/>
                <TopNavBar me={this.state.me}/>
                <LeftNavigation me={this.state.me}/>
                <div className="page-wrapper">
                    <PageBreadCrumb/>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3 mb-2">
                                <div className="list-group">
                                    <a href="#" className="list-group-item list-group-item-action disabled">
                                        PILIH POLI
                                    </a>
                                    {this.state.poli.map((item,index)=>
                                        <a onClick={()=> {
                                            this.setState({current_antrian:''});
                                            this.loadAntrian(item.value)
                                        }} key={index} href="#" className={this.state.current_poli === item.value ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action' }>
                                            {item.label}
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-5 mb-2">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title mb-0">ANTRIAN POLI</h3>
                                    </div>
                                    <div className="table-responsive">
                                        <table width="100%" className="table table-sm mb-0 table-bordered">
                                            <thead>
                                            <tr>
                                                <th className="align-middle text-center">NOMOR</th>
                                                <th width="150px" className="align-middle text-center">STATUS</th>
                                                <th width="50px" className="align-middle text-center">AKSI</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.antrian.length === 0 ?
                                                <tr>
                                                    <td colSpan={3} className="align-middle text-center">Belum ada antrian</td>
                                                </tr>
                                                :
                                                this.state.antrian.map((item,index)=>
                                                    <tr key={index}>
                                                        <td className="align-middle">
                                                            {item.meta.poli.meta.code}
                                                            {String(item.meta.numbers.poli).padStart(3,'0')}
                                                        </td>
                                                        <td className="align-middle text-center">
                                                            {item.meta.call === null ? <span className="badge badge-secondary">MENUNGGU</span> : <span className="badge badge-success">DIPANGGIL</span> }
                                                        </td>
                                                        <td className="align-middle text-center">
                                                            <button onClick={()=>this.callAntrian(item)} className={item.meta.call === null ? 'btn btn-block btn-outline-primary' : 'btn btn-block btn-outline-danger'}>
                                                                {item.meta.call === null ?
                                                                    <i className="fas fa-bell"/>
                                                                    :
                                                                    <i className="fas fa-bell-slash"/>
                                                                }
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card ">
                                    <div className="bg-primary card-header">
                                        <h3 className="text-white mb-0">NOMOR SEKARANG</h3>
                                    </div>
                                    <div className="card-body">
                                        <div style={{
                                            fontWeight:"bold", color:"green",
                                            fontSize:"40px", marginTop : "50px", marginBottom : "50px",
                                            textAlign:"center"
                                        }}>
                                            {this.state.current_poli === null ? null :
                                                this.state.current_antrian
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <PageFooter/>
                </div>
            </>
        );
    }

}

export default Dashboard;

if (document.getElementById('main-wrapper')){
    ReactDOM.render(<Dashboard/>, document.getElementById('main-wrapper'));
}
