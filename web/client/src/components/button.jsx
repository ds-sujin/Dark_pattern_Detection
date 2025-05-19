import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const Button = ({ to, children, variant = 'outline', className = '' }) => {

  // 이미지 경로 조건부 설정
  const iconSrc =
  variant === 'filled'
    ? '/iconArrowRight_w.svg'
    : '/iconArrowRight.svg';

    return (
      <Link to={to} className={`btn btn-${variant} ${className}`}>
        <span className="btn-text">{children}</span>
        <img src={iconSrc} alt="" className="btn-icon" />
        
      </Link>
    );
  };



export default Button;