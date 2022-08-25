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
import CrudDokter from "./Modals/CrudDokter";

class DokterPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            token : localStorage.getItem('_token'),
            me : null, dokter : [], poli : [],
            loadings : {
                page : true,
            },
            modals : {
                create : { open : false, data : null },
            }
        };
        this.loadDokter = this.loadDokter.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
    }
    componentDidMount() {
        this.loadMe();
    }
    toggleModal(what, data = null) {
        let modals = this.state.modals;
        modals[what].open = ! this.state.modals[what].open;
        if (data !== null) {
            modals[what].data = data;
        } else {
            modals[what].data = null;
        }
        this.setState({modals});
    }
    confirmDelete(data) {
        let token = this.state.token;
        const formData = new FormData();
        formData.append('id', data.value);
        let message = `Anda yakin ingin menghapus dokter ${data.label} ?`;
        Swal.fire({
            title : 'Perhatian !', html : message, icon : 'question', showCancelButton : true,
            confirmButtonText : 'Hapus', cancelButtonText : 'Batal', closeOnConfirm : false,
            showLoaderOnConfirm : true, allowOutsideClick : () => Swal.isLoading(), allowEscapeKey : () => Swal.isLoading(),
            preConfirm(e) {
                return Promise.resolve(Axios({headers:{"Accept" : "application/json", "Authorization" : "Bearer " + token},method:'post', data : formData, url : window.origin + '/api/dokter?_method=delete'}))
                    .then((response) => {
                        console.log(response);
                        if (response.data.params === null) {
                            Swal.showValidationMessage(response.data.messsage, true);
                            Swal.hideLoading();
                        } else {
                            Swal.close();
                            showSuccess(response.data.message);
                        }
                    })
                    .catch((error) => {
                        Swal.showValidationMessage(error.response.data.message, true);
                    })
            }
        }).then((e)=>{this.loadDokter()});
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
                this.loadDokter();
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
    async loadDokter(){
        $('#datatables').DataTable({
            destroy : true,
            paging: false,
            ordering: true,
            processing : true,
            serverSide: true,
            ajax : {
                url : window.origin + '/api/dokter',
                type : 'post',
                headers : { 'Authorization' : 'Bearer ' + this.state.token }
            },
            columns : [
                { data : 'label', name : 'name' },
                { data : 'meta.poli.label', name : 'poly' },
                { data : 'label' }
            ],
            columnDefs : [
                {
                    target : 2,
                    orderable : false,
                    createdCell : (td,cellData,rowData,row,col) => {
                        ReactDOM.render(
                            <>
                                <button onClick={()=>this.toggleModal('create', rowData)} className="btn btn-sm btn-outline-primary btn-block">
                                    <i className="fas fa-pencil-alt"/>
                                </button>
                                <button onClick={()=>this.confirmDelete(rowData)} className="btn btn-outline-danger btn-sm btn-block">
                                    <i className="fas fa-trash-alt"/>
                                </button>
                            </>
                            , td);
                    }
                }
            ]
        });
    }
    async loadPoli(){
        let loadings = this.state.loadings;
        loadings.page = true; this.setState({loadings});
        try {
            let response = await crudPoli(this.state.token, {});
            if (response.data === null) {
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
                <CrudDokter poli={this.state.poli} open={this.state.modals.create.open} data={this.state.modals.create.data} handleClose={this.toggleModal} handleUpdate={this.loadDokter} token={this.state.token}/>

                <PagePreloader/>
                <TopNavBar me={this.state.me}/>
                <LeftNavigation me={this.state.me}/>
                <div className="page-wrapper">
                    <PageBreadCrumb title="Dokter" loading={this.state.loadings.page}
                                    buttons={[
                                        {onClick:()=>this.toggleModal('create',null), className:'btn btn-outline-primary mr-1',title:'Tambah Data', icon : <i className="fas fa-plus-circle mr-1"/>, tooltip:'Tambah Data' },
                                        {onClick:()=>this.loadDokter(), className:'btn btn-outline-primary mr-1',title: null,icon: <i className="fas fa-recycle"/>, tooltip: 'Reload' }
                                    ]} />

                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <table id="datatables" width="100%" className="table table-sm">
                                    <thead>
                                    <tr>
                                        <th className="align-middle text-center">Nama Dokter</th>
                                        <th className="align-middle text-center">Poli</th>
                                        <th width="50px" className="align-middle text-center">AKSI</th>
                                    </tr>
                                    </thead>
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

export default DokterPage;

if (document.getElementById('main-wrapper')){
    ReactDOM.render(<DokterPage/>, document.getElementById('main-wrapper'));
}
