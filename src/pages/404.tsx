import { CustomPageComponent } from '../types/global'; // Import CustomPageComponent if defined in a separate file

const LoginPage: CustomPageComponent = () => {
  return <div>Login Page</div>;
};

// Set noLayout to true
LoginPage.noLayout = true;

export default LoginPage;