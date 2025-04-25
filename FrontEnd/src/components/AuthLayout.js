// src/components/AuthLayout.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AuthStyles.css';

const AuthLayout = ({ title, children, footerText, footerLink, footerLinkText }) => {
  return (
    <div className="auth-background">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow auth-card">
              <div className="card-body">
                <h2 className="card-title auth-title text-center mb-4">{title}</h2>
                {children}
                <div className="auth-link mt-3">
                  <p>{footerText} <Link to={footerLink}>{footerLinkText}</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;