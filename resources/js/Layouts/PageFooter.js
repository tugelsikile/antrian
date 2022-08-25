import React from "react";

class PageFooter extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <footer className="footer text-center text-muted">
                All Rights Reserved by RSTNET. Designed and Developed by
                <a target="_blank" href="https://rst.net.id">RSTNET</a>.
            </footer>
        );
    }


}

export default PageFooter;
