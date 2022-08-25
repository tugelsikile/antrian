import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

import {crudPoli} from "../../../Services/PoliService";
import {showError, showSuccess} from "../../../Components/Toaster";

class CreatePoli extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            form : { kode : '', nama : '', keterangan : '', id : '' },
            button : { disabled : false, text : 'Tambah' }
        };
        this.submitCreate = this.submitCreate.bind(this);
    }
    componentWillReceiveProps(props) {
        let form = this.state.form;
        form.nama = '', form.keterangan = '', form.kode = '';
        let button = this.state.button;
        if (!props.open){
            form.id = '';
            button.text = 'Tambah';
        } else {
            if (props.data !== null) {
                form.kode = props.data.meta.code;
                form.nama = props.data.label;
                form.id = props.data.value;
                form.keterangan = props.data.meta.description;
                button.text = 'Simpan';
            }
        }
        this.setState({form,button});
    }
    async submitCreate(e){
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('_method', this.state.form.id.length === 0 ? 'put' : 'patch');
            formData.append('id', this.state.form.id);
            formData.append('kode_poli', this.state.form.kode);
            formData.append('nama_poli', this.state.form.nama);
            formData.append('keterangan_poli', this.state.form.keterangan);
            let response = await crudPoli(this.props.token, formData);
            if (response.data.params === null) {
                showError(response.data.message);
            } else {
                this.props.handleClose('create', null);
                this.props.handleUpdate();
                showSuccess(response.data.message);
            }
        } catch (e) {
            showError(e.response.data.message);
        }
    }

    render() {
        return (
            <Dialog
                id="modal-create" fullWidth maxWidth="lg"
                open={this.props.open}
                onClose={() => this.state.button.disabled ? null : this.props.handleClose('create')}
                scroll="body">
                <form onSubmit={this.submitCreate}>
                    <DialogTitle>Form Poli</DialogTitle>
                    <DialogContent dividers={true}>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label">Kode Poli</label>
                            <div className="col-md-4">
                                <input onChange={(e)=>{
                                    let form = this.state.form; form.kode = e.target.value; this.setState({form});
                                }} value={this.state.form.kode} className="form-control" disabled={this.state.button.disabled}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label">Nama Poli</label>
                            <div className="col-md-4">
                                <input onChange={(e)=>{
                                    let form = this.state.form; form.nama = e.target.value; this.setState({form});
                                }} value={this.state.form.nama} className="form-control" disabled={this.state.button.disabled}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label">Keterangan Poli</label>
                            <div className="col-md-4">
                                <textarea onChange={(e)=>{
                                    let form = this.state.form; form.keterangan = e.target.value; this.setState({form});
                                }} value={this.state.form.keterangan} className="form-control" disabled={this.state.button.disabled} style={{resize:'none'}}/>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button type="submit" disabled={this.state.button.disabled} className="btn btn-outline-primary btn-flat mr-1"><i className="fas fa-save" /> {this.state.button.text}</button>
                        <button type="button" onClick={() => this.state.button.disabled ? null : this.props.handleClose('create')} disabled={this.state.button.disabled} className="btn btn-outline-secondary btn-flat"><i className="fas fa-window-close" /> Tutup</button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

export default CreatePoli;
