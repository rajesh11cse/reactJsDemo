import React from 'react';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }
    render() {
        return (
            <div>
                <section className="content">
                    <section style={{
                        border: "1px solid #3C6EB4",
                        backgroundColor: '#fff', height: '55px', color: 'black', padding: '17'
                    }} className="container">
                        <b className="">Dashboard</b>
                        <b className="pull-right">{this.state.date.toUTCString()}</b>
                    </section>
                </section>
                <br />
                <section className="content">
                    <div style={{
                        border: "1px solid #3C6EB4", backgroundColor: '#fff',
                        color: 'black', padding: '18'
                    }}
                        className="container">

                        {/*Mange users*/}
                        <div className="col-md-6">
                            <div className="panel panel-primary" style={{ color: "#8C8B8B", fontStyle: "italic" }}>
                                <div className="panel-heading">
                                    <p className="panel-title">
                                        <a href="#/lms/manage_users">Manage Users</a>
                                    </p>
                                </div>
                                <div className="panel-body" style={{ backgroundColor: "#F7F8FA" }}>
                                    <div className="col-md-2">
                                        <a href="#!/lms/manage_users"><img src="images/lms.png" width="90" alt="image not found" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/*Manage Library Books*/}
                        <div className="col-md-6">
                            <div className="panel panel-primary" style={{ color: "#8C8B8B", fontStyle: "italic" }}>
                                <div className="panel-heading">
                                    <p className="panel-title">
                                        <a href="#!/lms/manage_users">********************</a>
                                    </p>
                                </div>
                                <div className="panel-body" style={{ backgroundColor: "#F7F8FA" }}>
                                    <div className="col-md-2">
                                        <a href="#!/lms/manage_users"><img src="images/lms.png" width="90" alt="image not found" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/*Issue/Return Library Books*/}
                        <div className="col-md-6">
                            <div className="panel panel-primary" style={{ color: "#8C8B8B", fontStyle: "italic" }}>
                                <div className="panel-heading">
                                    <p className="panel-title">
                                        <a href="#!/lms/manage_users">********************</a>
                                    </p>
                                </div>
                                <div className="panel-body" style={{ backgroundColor: "#F7F8FA" }}>
                                    <div className="col-md-2">
                                        <a href="#!/lms/manage_users"><img src="images/lms.png" width="90" alt="image not found" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/*Manage Library Transactions*/}
                        <div className="col-md-6">
                            <div className="panel panel-primary" style={{ color: "#8C8B8B", fontStyle: "italic" }}>
                                <div className="panel-heading">
                                    <p className="panel-title">
                                        <a href="#!/lms/manage_users">********************</a>
                                    </p>
                                </div>
                                <div className="panel-body" style={{ backgroundColor: "#F7F8FA" }}>
                                    <div className="col-md-2">
                                        <a href="#!/lms/manage_users"><img src="images/lms.png" width="90" alt="image not found" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        )
    }
}

export default Home;