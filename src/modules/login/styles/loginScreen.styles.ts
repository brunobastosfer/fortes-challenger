import styled from 'styled-components';

export const ContainerMain = styled.div`
  display: flex;
  height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ForgetPassword = styled.p`
  text-decoration: underline;
  color: #6d9bf9;
  margin-left: 5px;
  text-align: left;
  width: 100%;
  cursor: pointer;
`

export const RegisterText = styled.p`
  text-decoration: underline;
  color: #6d9bf9;
  margin-left: 5px;
  text-align: center;
  cursor: pointer;
`

export const BackgroundImageContainer = styled.div`
  position: relative;
  flex: 0 0 70%;
  overflow: hidden;
  

  @media (max-width: 768px) {
    display: none;
  }
`;

export const BackgroundImage = styled.img`
  width: 70vw;
  height: 100vh;
  object-fit: cover;
  filter: blur(5px) brightness(0.7);
`;

export const TextOverlay = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
`;

export const HeaderText = styled.h1`
  font-size: 32px;
  line-height: 1.0;
  margin-bottom: 10px;
`;

export const SubheaderText = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const RightSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
`;

// export const FormContainer = styled.div<{ isHidden: boolean }>`
//   display: ${(props) => (props.isHidden ? 'none' : 'block')};

//   @media (max-width: 768px) {
//     display: block;
//   }
// `;