import React from 'react';
import ReactDOM from 'react-dom';

import {me} from "../../Services/AuthService";
import PagePreloader from "../../Layouts/PagePreloader";
import TopNavBar from "../../Layouts/TopNavBar";
import LeftNavigation from "../../Layouts/LeftNavigation";
import PageBreadCrumb from "../../Layouts/PageBreadCrumb";
import PageFooter from "../../Layouts/PageFooter";
import {showError,showSuccess} from "../../Components/Toaster";
import {crudSettingAplikasi} from "../../Services/SettingService";

class SettingAplikasiPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            token : localStorage.getItem('_token'),
            me : null,
            form : {
                nama : '', alamat : ''
            },
            loadings : {
                page : true,
            },
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.loadMe();
    }
    async handleSubmit(e){
        e.preventDefault();
        let loadings = this.state.loadings;
        loadings.page = true; this.setState({loadings});
        try {
            const formData = new FormData();
            formData.append('_method', 'patch');
            formData.append('nama_rumah_sakit', this.state.form.nama);
            formData.append('alamat', this.state.form.alamat);
            let response = await crudSettingAplikasi(this.state.token,formData);
            if (response.data.params === null) {
                showError(response.data.message);
            } else {
                showSuccess(response.data.message);
                this.setState({form:response.data.params});
            }
        } catch (e) {
            showError(e.response.data.message);
        }
        loadings.page = false; this.setState({loadings});
    }
    async loadSetting(){
        let loadings = this.state.loadings;
        loadings.page = true; this.setState({loadings});
        try {
            let response = await crudSettingAplikasi(this.state.token,{});
            if (response.data.params === null) {
                showError(response.data.message);
            } else {
                this.setState({form:response.data.params});
            }
        } catch (e) {
            showError(e.response.data.message);
        }
        loadings.page = false; this.setState({loadings});
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
                this.loadSetting();
            }
        } catch (e) {
            if (e.response.status === 401) {
                window.location.href = window.origin + '/login';
            }
            showError(e.response.data.message);
        }
        loadings.page = false; this.setState({loadings});
    }
    render() {
        return (
            <>
                <PagePreloader/>
                <TopNavBar me={this.state.me}/>
                <LeftNavigation me={this.state.me}/>
                <div className="page-wrapper">
                    <PageBreadCrumb title="Setting Aplikasi" loading={this.state.loadings.page}
                                    buttons={[]} />

                    <div className="container-fluid">
                        <form onSubmit={this.handleSubmit}>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="mb-0 card-title">Setting Aplikasi Antrian</h3>
                                </div>
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label className="col-md-2 col-form-label">Nama Rumah Sakit</label>
                                        <div className="col-md-10">
                                            <input onChange={(e)=>{
                                                let form = this.state.form; form.nama = e.target.value; this.setState({form});
                                            }} value={this.state.form.nama} className="form-control" disabled={this.state.loadings.page}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-2 col-form-label">Alamat</label>
                                        <div className="col-md-10">
                                            <textarea onChange={(e)=>{
                                                let form = this.state.form; form.alamat = e.target.value; this.setState({form});
                                            }} value={this.state.form.alamat} className="form-control" disabled={this.state.loadings.page} style={{resize:'none'}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer text-right">
                                    <button type="submit" className="btn btn-outline-primary" disabled={this.state.loadings.page}>
                                        <i className="fas fa-save"/> Simpan
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <PageFooter/>
                </div>
            </>
        );
    }
}

export default SettingAplikasiPage;

if (document.getElementById('main-wrapper')){
    ReactDOM.render(<SettingAplikasiPage/>, document.getElementById('main-wrapper'));
}
