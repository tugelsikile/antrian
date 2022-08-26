import React from 'react';

class TopNavBar extends React.Component{
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <>
                <header className="topbar" data-navbarbg="skin6">
                    {this.props.me === null ? null :
                        <nav className="navbar top-navbar navbar-expand-md">
                            <div className="navbar-header" data-logobg="skin6">
                                <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="#">
                                    <i className="ti-menu ti-close"/>
                                </a>
                                <div className="navbar-brand">
                                    <a href={window.origin}>
                                        <b className="logo-icon">
                                            <img src={window.origin + '/adminmart/assets/images/logo-icon.png'} alt="homepage" className="dark-logo"/>
                                            <img src={window.origin + '/adminmart/assets/images/logo-icon.png'} alt="homepage" className="light-logo"/>
                                        </b>
                                        <span className="logo-text">
                                    {/*<img src={window.origin + '/adminmart/assets/images/logo-text.png'} alt="homepage" className="dark-logo"/>*/}
                                    <span>APLIKASI ANTRIAN</span>
                                    {/*<img src={window.origin + '/adminmart/assets/images/logo-light-text.png'} className="light-logo" alt="homepage"/>*/}
                                </span>
                                    </a>
                                </div>

                                <a className="topbartoggler d-block d-md-none waves-effect waves-light"
                                   href="#" data-toggle="collapse" data-target="#navbarSupportedContent"
                                   aria-controls="navbarSupportedContent" aria-expanded="false"
                                   aria-label="Toggle navigation"><i className="ti-more"/>
                                </a>
                            </div>

                            <div className="navbar-collapse collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav float-left mr-auto ml-3 pl-1">
                                </ul>

                                <ul className="navbar-nav float-right">

                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown"
                                           aria-haspopup="true" aria-expanded="false">
                                            <img src={window.origin + '/adminmart/assets/images/users/profile-pic.jpg'} alt="user" className="rounded-circle" width="40"/>
                                            <span className="ml-2 d-none d-lg-inline-block">
                                        <span>Hello,</span>
                                        <span className="text-dark">{this.props.me.label}</span>
                                        <i data-feather="chevron-down" className="svg-icon"/>
                                    </span>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right user-dd animated flipInY">
                                            <a className="dropdown-item" href={window.origin + '/logout'}>
                                                <i data-feather="power" className="svg-icon mr-2 ml-1"/>
                                                Logout
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    }
                </header>
            </>
        );
    }

}

export default TopNavBar;
