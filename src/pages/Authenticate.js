import React from 'react';
import { userService } from '../authentication/_services';
import { useState } from 'react';

const Authenticate = () => {
    
    const [authDetails, setAuthDetails] = useState({ username: '', password: '', submitted: false, loading: false, error: ''});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthDetails({...authDetails, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setAuthDetails({...authDetails, submitted: true });
        const { username, password, returnUrl } = authDetails;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        setAuthDetails({ ...authDetails, loading: true });
        userService.login(username, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => setAuthDetails({...authDetails, error, loading: false })
            );
    }

        // const { username, password, submitted, loading, error } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={handleSubmit}>
                    <div className={'form-group' + (authDetails['submitted'] && ! authDetails['username'] ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={authDetails['username']} onChange={handleChange} />
                        {authDetails['submitted'] && ! authDetails['username'] &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (authDetails['submitted'] && ! authDetails['password'] ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={authDetails['password']} onChange={handleChange} />
                        {authDetails['submitted'] && ! authDetails['password'] &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" disabled={authDetails['loading']}>Login</button>
                        {authDetails['loading'] &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                    {authDetails['error'] &&
                        <div className={'alert alert-danger'}>{error}</div>
                    }
                </form>
            </div>
        );
}

export default Authenticate; 