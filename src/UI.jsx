import React, { Component } from 'react';

class App extends React.Component{
    state ={
        username:'',
        password:'',
        data:''
    }

    handleChange= (event) => {
        const {name,value} = event.target;
        this.setState({
            [name]:value
        })
    }
    handleClose=()=>{
        this.setState({data:''})
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        const {username,password} = this.state;

        // fetch API for making http Request
        fetch('https://Arshath01.github.io/client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,password
            })
        })
            .then(response => response.json())
            .then(data => this.setState({data:data}))
            .catch(error => {
                console.error('Error:', error);
            });

    }
    render(){
        
        const resMessage = JSON.stringify(this.state.data.message);

        return(
            <div className=' m-5'>

                <div>
                    {
                    resMessage &&
                        <div>
                            <p className='alert alert-success alert-dismissible'>
                                {resMessage.replace(/"/g,"")} 
                                <button 
                                    className='btn btn-sm btn-danger rounded' 
                                    style={{float:'right'}} 
                                    onClick={this.handleClose}>
                                        <span aria-hidden='true'>&times;</span>
                                </button>
                            </p>
                        </div>
                    }
                </div>

                <input 
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.username}
                    name='username'
                    className='form-control m-5 w-50' 
                    placeholder='Enter the username...' />

                <input 
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.password}
                    name='password'
                    className='form-control m-5 w-50' 
                    placeholder='Enter the password....' />

                <button 
                    className='btn btn-primary ms-5' 
                    onClick={this.handleSubmit}>Send</button>
            </div>
        );
    }
}

export default App;