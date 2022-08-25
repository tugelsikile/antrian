import React from 'react';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';
import Axios from 'axios';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-bs4/js/dataTables.bootstrap4.min";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import $ from 'jquery';

import {me} from "../../Services/AuthService";
import PagePreloader from "../../Layouts/PagePreloader";
import TopNavBar from "../../Layouts/TopNavBar";
import LeftNavigation from "../../Layouts/LeftNavigation";
import PageBreadCrumb from "../../Layouts/PageBreadCrumb";
import PageFooter from "../../Layouts/PageFooter";
import {showError,showSuccess} from "../../Components/Toaster";
import {crudPoli} from "../../Services/PoliService";
import {crudDokter} from "../../Services/DokterService";

class AntrianPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            token : localStorage.getItem('_token'),
            me : null, poli : [], dokter : [],
            loadings : {
                page : true,
            },
            modals : {
                create : { open : false, data : null },
            }
        };
    }
    componentDidMount() {
        this.loadMe();
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
                this.loadAntrian();
                this.loadPoli();
                this.loadDokter();
            }
        } catch (e) {
            if (e.response.status === 401) {
                window.location.href = window.origin + '/login';
            }
            showError(e.response.data.message);
        }
        loadings.page = false; this.setState({loadings});
    }
    async loadAntrian(){

    }
    async loadDokter(){
        let loadings = this.state.loadings;
        loadings.page = true; this.setState({loadings});
        try {
            let response = await crudDokter(this.state.token, {});
            if (response.data.data === null) {
                showError(response.data.message);
            } else {
                this.setState({dokter:response.data.data});
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
            let response = await crudPoli(this.state.token, {});
            if (response.data.data === null) {
                showError(response.data.message);
            } else {
                this.setState({poli:response.data.data});
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
                    <PageBreadCrumb title="Poli" loading={this.state.loadings.page}
                                    buttons={[
                                        {onClick:()=>this.toggleModal('create',null), className:'btn btn-outline-primary mr-1',title:'Tambah Data', icon : <i className="fas fa-plus-circle mr-1"/>, tooltip:'Tambah Data' },
                                        {onClick:()=>this.loadPoli(), className:'btn btn-outline-primary mr-1',title: null,icon: <i className="fas fa-recycle"/>, tooltip: 'Reload' }
                                    ]} />

                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <table id="datatables" width="100%" className="table table-sm">
                                    <thead>
                                    <tr>
                                        <th width="150px" className="align-middle text-center">KODE</th>
                                        <th className="align-middle text-center">Nama Poli</th>
                                        <th width="50px" className="align-middle text-center">AKSI</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.poli.map((item,index)=>
                                        <tr key={index}>
                                            <td>{item.meta.code}</td>
                                            <td>{item.label}</td>
                                            <td>
                                                <button onClick={()=>this.toggleModal('create', item)} className="btn btn-sm btn-outline-primary btn-block">
                                                    <i className="fas fa-pencil-alt"/>
                                                </button>
                                                <button onClick={()=>this.confirmDelete(item)} className="btn btn-outline-danger btn-sm btn-block">
                                                    <i className="fas fa-trash-alt"/>
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <PageFooter/>
                </div>
            </>
        );
    }
}

export default AntrianPage;

if (document.getElementById('main-wrapper')){
    ReactDOM.render(<AntrianPage/>, document.getElementById('main-wrapper'));
}
