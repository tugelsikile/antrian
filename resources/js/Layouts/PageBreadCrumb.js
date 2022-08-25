import React from "react";

class PageBreadCrumb extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-7 align-self-center">
                        <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">
                            { typeof this.props.title !== 'undefined' && this.props.title}
                        </h3>
                        <div className="d-flex align-items-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0 p-0">
                                    <li className="breadcrumb-item">
                                        <a href={window.origin}>Dashboard</a>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="col-5 align-self-center">
                        <div className="customize-input float-right">
                            {typeof this.props.buttons !== 'undefined' &&
                                this.props.buttons.map((item,index)=>
                                    <button key={index} title={item.tooltip} disabled={this.props.loading} onClick={item.onClick} className={item.className}>
                                        {item.icon}
                                        {item.title}
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageBreadCrumb;
