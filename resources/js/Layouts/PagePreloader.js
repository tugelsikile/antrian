import React from 'react';

class PagePreloader extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="preloader">
                <div className="lds-ripple">
                    <div className="lds-pos"/>
                    <div className="lds-pos"/>
                </div>
            </div>
        );
    }
}

export default PagePreloader;
