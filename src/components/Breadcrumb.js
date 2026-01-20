import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
  ];

  pathnames.forEach((name, index) => {
    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
    const label = name.charAt(0).toUpperCase() + name.slice(1);
    breadcrumbItems.push({ label, path });
  });

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {breadcrumbItems.map((item, index) => (
          <li key={item.path} className="breadcrumb-item">
            {index === breadcrumbItems.length - 1 ? (
              <span className="breadcrumb-current">{item.label}</span>
            ) : (
              <>
                <Link to={item.path} className="breadcrumb-link">
                  {item.label}
                </Link>
                <span className="breadcrumb-separator">/</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
