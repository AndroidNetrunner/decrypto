import React, { useRef, useState } from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';
import Header from '../Components/Layout/Header';
import Overlay from '../Components/Common/Overlay';

export default function BaseLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  const onLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onClickSocialLoginButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;
    // let socialProvider =
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    if (headerRef.current !== null) {
      headerRef.current.style.cssText = headerRef.current.style.cssText ? '' : 'filter: blur(3px)';
    }
    if (mainRef.current !== null) {
      mainRef.current.style.cssText = mainRef.current.style.cssText ? '' : 'filter: blur(3px)';
    }
  };

  const togglePasswordVisibility = () => {
    const { current } = passwordInputRef;
    if (current !== null) {
      current.type = current.type === 'password' ? 'text' : 'password';
    }
  };

  return (
    <>
      <Header>
        <HeaderWrapper ref={headerRef}>
          <div>LOGO</div>
          <LoginButton onClick={toggleModal}>Login</LoginButton>
        </HeaderWrapper>
      </Header>
      <Main ref={mainRef}>
        <Outlet />
      </Main>
      {isModalOpen && (
        <Overlay onClickOverlay={toggleModal}>
          <LoginWrapper onClick={(e) => e.stopPropagation()}>
            <CloseButton>
              <svg
                onClick={toggleModal}
                xmlns='http://www.w3.org/2000/svg'
                width='28px'
                height='28px'
                viewBox='0 0 24 24'
              >
                <g data-name='Layer 2'>
                  <g data-name='close'>
                    <rect width='24' height='24' transform='rotate(180 12 12)' opacity='0' />
                    <path d='M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z' />
                  </g>
                </g>
              </svg>
            </CloseButton>
            <LoginForm onSubmit={onLoginSubmit}>
              <InputContainer>
                <input type='email' placeholder='이메일' />
                <input ref={passwordInputRef} type='password' placeholder='비밀번호' />
              </InputContainer>
              <LoginButton type='submit'>로그인</LoginButton>
              <LoginButton type='button' name='gitHub' onClick={onClickSocialLoginButton} bgColor='#3c4043'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='21px'
                  height='21px'
                  viewBox='0 0 16 16'
                  fill='white'
                >
                  <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
                </svg>
              </LoginButton>
              <LoginButton type='button' name='google' onClick={onClickSocialLoginButton} bgColor='#f8f8f8'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  width='22px'
                  height='22px'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='#EA4335 '
                    d='M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z'
                  />
                  <path
                    fill='#34A853'
                    d='M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z'
                  />
                  <path
                    fill='#4A90E2'
                    d='M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z'
                  />
                  <path
                    fill='#FBBC05'
                    d='M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z'
                  />
                </svg>
              </LoginButton>
            </LoginForm>
          </LoginWrapper>
        </Overlay>
      )}
    </>
  );
}

const Main = styled.main`
  width: 100%;
  padding: 0rem 5rem;
  margin: 0 auto;
  height: calc(100vh - 8.15rem);
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 86rem;
  margin: 0 auto;
`;

const LoginButton = styled.button<{ bgColor?: string }>`
  cursor: pointer;
  background-color: ${(props) => props.bgColor ?? 'inherit'};
`;

const CloseButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1rem;
  svg {
    cursor: pointer;
  }
`;

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  max-width: 40rem;
  max-height: 40rem;
  border-radius: 1rem;
  padding: 2rem;
  ${LoginButton} {
    width: 100%;
    border: none;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
    &[type='submit'] {
      margin-bottom: 8rem;
    }
  }
`;

const LoginForm = styled.form``;

const InputContainer = styled.div`
  input {
    width: 100%;
    border: none;
    font-size: 1.7rem;
    padding: 1rem;
    border: 1px solid black;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    &:focus {
      outline: none;
      border-color: #ff9999;
    }
  }
`;
