import React from 'react'
import Menu from './Menu'

const Base = ({title = 'Title', description = 'Description', className = 'bg-dark text-white', children}) => {
    return (
        <div>
            <div className="container-fluid">
                <Menu />
                <div className="bg-dark text-white text-center jumbotron">
                    <div className="display-4">{title}</div>
                    <p className="lead">{description}</p>
                    <hr style = {{border: "1px solid #28a745"}}/>
                    <div className={className}>{children}</div>
                    <footer className="footer bg-dark mt-auto py-3">
                        <div className="container-fluid bg-success text-white text-center py-3">
                            <h4>If you got any question feel free to contact us</h4>
                            <button className="btn btn-warning btn-lg">Contact Us</button>
                            <div className="container">
                                <span className="text-white" style = {{fontSize: 16}}>
                                    A Django React Fullstack Course
                                </span>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
 
export default Base;