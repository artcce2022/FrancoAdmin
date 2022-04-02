import React  from 'react'

const  Content = ({body, title})=> {

    
    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">{title}</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                {/* <li className="breadcrumb-item"><a href="#">Home</a></li> */}
                                <li className="breadcrumb-item active">{title}</li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            {/* /.content-header */}
            {/* Main content */}
            <div className="content">
                <div className="container-fluid">
                {body}
                </div>
                {/* /.container-fluid */}
            </div>           
        </div>
    )
}

export default Content