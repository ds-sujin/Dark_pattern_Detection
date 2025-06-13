import React, { useState } from 'react';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { validateEmail, validatePassword } from '../utils/validation';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!name || !id || !password || !confirmPassword) {
      return setError('모든 필드를 입력해주세요.');
    }

    if (!validateEmail(id)) {
      return setError('유효한 이메일 주소를 입력해주세요.');
    }

    if (!validatePassword(password)) {
      return setError('비밀번호는 8자 이상이며 문자와 숫자를 포함해야 합니다.');
    }

    if (password !== confirmPassword) {
      return setError('비밀번호가 일치하지 않습니다.');
    }

    if (!agree) {
      return setError('개인정보 수집 및 이용에 동의해주세요.');
    }

    try {
      const res = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, id, password }),
      });

      const data = await res.json();

      if (data.success) {
        alert('회원가입이 완료되었습니다.');
        navigate('/register-complete');
      } else {
        setError(data.message || '회원가입에 실패했습니다.');
      }
    } catch (err) {
      setError('서버 오류로 회원가입에 실패했습니다.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <div className="register-form">
          <h2>회원가입</h2>
          <p>회원정보작성과 약관에 동의해주세요.</p>

          <input
            type="text"
            placeholder="이름을 입력해주세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="아이디로 사용할 이메일 주소를 입력해주세요."
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            (필수) 개인정보 수집 및 이용에 동의합니다.
          </label>

          {error && <p className="error">{error}</p>}

          <button onClick={handleRegister}>가입하기</button>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
