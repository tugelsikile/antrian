import React from 'react';
import { Toaster } from 'react-hot-toast';

class LeftNavigation extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <>
                <Toaster position="top-right"/>
                <aside className="left-sidebar" data-sidebarbg="skin6">
                    <div className="scroll-sidebar" data-sidebarbg="skin6">
                        <nav className="sidebar-nav">
                            <ul id="sidebarnav">
                                <li className="sidebar-item">
                                    <a className="sidebar-link sidebar-link" href={window.origin} aria-expanded="false">
                                        <i data-feather="home" className="feather-icon"/>
                                        <span className="hide-menu">Dashboard</span>
                                    </a>
                                </li>
                                <li className="list-divider"/>

                                <li className="nav-small-cap"><span className="hide-menu">Aplikasi</span></li>
                                <li className="sidebar-item">
                                    <a className="sidebar-link" href={window.origin + '/poli'} aria-expanded="false">
                                        <i data-feather="file-text" className="feather-icon"/>
                                        <span className="hide-menu">POLI</span>
                                    </a>
                                </li>
                                <li className="sidebar-item">
                                    <a className="sidebar-link" href={window.origin + '/dokter'} aria-expanded="false">
                                        <i data-feather="file-text" className="feather-icon"/>
                                        <span className="hide-menu">DOKTER</span>
                                    </a>
                                </li>
                                <li className="sidebar-item">
                                    <a className="sidebar-link" href={window.origin + '/antrian'} aria-expanded="false">
                                        <i data-feather="file-text" className="feather-icon"/>
                                        <span className="hide-menu">ANTRIAN</span>
                                    </a>
                                </li>
                                <li className="sidebar-item">
                                    <a className="sidebar-link has-arrow" href="#" aria-expanded="false">
                                        <i data-feather="file-text" className="feather-icon"/>
                                        <span className="hide-menu">LAUNCHER</span>
                                    </a>
                                    <ul aria-expanded="false" className="collapse  first-level base-level-line">
                                        <li className="sidebar-item">
                                            <a href={window.origin + '/tamu/antrian'} target="_blank" className="sidebar-link">
                                                <span className="hide-menu">LAYAR ANTRIAN</span>
                                            </a>
                                        </li>
                                        <li className="sidebar-item">
                                            <a href={window.origin + '/tamu/antrian/input'} target="_blank" className="sidebar-link">
                                                <span className="hide-menu">LAYAR INPUT ANTRIAN</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="list-divider"/>
                                <li className="nav-small-cap"><span className="hide-menu">Settings</span></li>
                                <li className="sidebar-item">
                                    <a className="sidebar-link" href={window.origin + '/setting/aplikasi'} aria-expanded="false">
                                        <i data-feather="file-text" className="feather-icon"/>
                                        <span className="hide-menu">APLIKASI</span>
                                    </a>
                                </li>
                                <li className="sidebar-item">
                                    <a className="sidebar-link" href={window.origin + '/setting/printer'} aria-expanded="false">
                                        <i data-feather="file-text" className="feather-icon"/>
                                        <span className="hide-menu">PRINTER</span>
                                    </a>
                                </li>

                            </ul>
                        </nav>
                    </div>
                </aside>
            </>
        );
    }

}

export default LeftNavigation;
