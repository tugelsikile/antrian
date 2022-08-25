import React from "react";
import ReactDOM from 'react-dom';
import PagePreloader from "../../Layouts/PagePreloader";
import {loginSubmit} from "../../Services/AuthService";

class LoginPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            form : { username : '', password : '' },
            loading : false,
        };
        this.submitLogin = this.submitLogin.bind(this);
    }
    async submitLogin(e){
        e.preventDefault();
        this.setState({loading:true});
        try {
            let response = await loginSubmit({nama_pengguna:this.state.form.username,kata_sandi:this.state.form.password});
            if (response.data.params === null) {
                alert(response.data.message);
            } else {
                localStorage.setItem('_token', response.data.params);
                window.location.href = window.origin + '/dashboard';
            }
        } catch (e) {
            alert(e.response.data.message);
        }
        this.setState({loading:false});
    }
    render() {
        return (
            <>
                <PagePreloader/>
                <div
                    className="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative"
                    style={{
                        backgroundImage: `url('${window.origin}/adminmart/assets/images/big/auth-bg.jpg')`,
                        backgroundRepeat:'no-repeat',
                        backgroundPosition:'center'
                    }}>
                    <div className="auth-box row">
                        <div className="col-lg-7 col-md-5 modal-bg-img"
                             style={{
                                 backgroundImage: `url('${window.origin}/adminmart/assets/images/big/3.jpg')`,
                                 backgroundRepeat:'no-repeat',
                                 backgroundPosition:'center'
                             }}>
                        </div>
                        <div className="col-lg-5 col-md-7 bg-white">
                            <div className="p-3">
                                <div className="text-center">
                                    <img src={window.origin + '/adminmart/assets/images/big/icon.png'} alt="wrapkit"/>
                                </div>
                                <h2 className="mt-3 text-center">Masuk</h2>
                                <p className="text-center">
                                    Masukkan nama pengguna dan kata sandi untuk masuk ke panel admin.
                                </p>
                                <form onSubmit={this.submitLogin} className="mt-4">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label className="text-dark" htmlFor="uname">Nama Pengguna</label>
                                                <input onChange={(e)=>{
                                                    let form = this.state.form; form.username = e.target.value; this.setState({form});
                                                }} value={this.state.form.username} className="form-control" id="uname" type="text" placeholder="masukkan nama pengguna"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label className="text-dark" htmlFor="pwd">Kata Sandi</label>
                                                <input onChange={(e)=>{
                                                    let form = this.state.form; form.password = e.target.value; this.setState({form});
                                                }} value={this.state.form.password} className="form-control" id="pwd" type="password" placeholder="masukkan kata sandi"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 text-center">
                                            <button disabled={this.state.loading} type="submit" className="btn btn-block btn-dark">
                                                {this.state.loading ? 'Proses Masuk' : 'Masuk'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


export default LoginPage;

if (document.getElementById('login-page')){
    ReactDOM.render(<LoginPage/>, document.getElementById('login-page'));
}
