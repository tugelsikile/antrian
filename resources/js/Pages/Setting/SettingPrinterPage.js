import React from 'react';
import ReactDOM from 'react-dom';

import {me} from "../../Services/AuthService";
import PagePreloader from "../../Layouts/PagePreloader";
import TopNavBar from "../../Layouts/TopNavBar";
import LeftNavigation from "../../Layouts/LeftNavigation";
import PageBreadCrumb from "../../Layouts/PageBreadCrumb";
import PageFooter from "../../Layouts/PageFooter";
import {showError,showSuccess} from "../../Components/Toaster";
import {crudSettingPrinter} from "../../Services/SettingService";

class SettingPrinterPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            token : localStorage.getItem('_token'),
            me : null,
            form : {
                ip : '', nama : ''
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
            formData.append('alamat_ip_komputer_printer', this.state.form.ip);
            formData.append('nama_share_printer', this.state.form.nama);
            let response = await crudSettingPrinter(this.state.token,formData);
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
            let response = await crudSettingPrinter(this.state.token,{});
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
                    <PageBreadCrumb title="Setting Printer" loading={this.state.loadings.page}
                                    buttons={[]} />

                    <div className="container-fluid">
                        <form onSubmit={this.handleSubmit}>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="mb-0 card-title">Setting Printer Antrian</h3>
                                </div>
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label className="col-md-4 col-form-label">Alamat IP Komputer Printer</label>
                                        <div className="col-md-8">
                                            <input onChange={(e)=>{
                                                let form = this.state.form; form.ip = e.target.value; this.setState({form});
                                            }} value={this.state.form.ip} className="form-control" disabled={this.state.loadings.page}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-4 col-form-label">Nama Share Printer</label>
                                        <div className="col-md-8">
                                            <input onChange={(e)=>{
                                                let form = this.state.form; form.nama = e.target.value; this.setState({form});
                                            }} value={this.state.form.nama} className="form-control" disabled={this.state.loadings.page}/>
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
                        <div className="card bg-warning">
                            <div className="card-body">
                                Cara Setting Printer : <br/>
                                <ol>
                                    <li>Setting alamat IP dimana aplikasi disimpan menjadi static. contoh 192.168.1.1</li>
                                    <li>Share printer thermal (pastikan nama share tanpa karakter spesial dan spasi)</li>
                                    <li>Sesuaikan form diatas dengan setting pada langkah 1 dan 2</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <PageFooter/>
                </div>
            </>
        );
    }
}

export default SettingPrinterPage;

if (document.getElementById('main-wrapper')){
    ReactDOM.render(<SettingPrinterPage/>, document.getElementById('main-wrapper'));
}
