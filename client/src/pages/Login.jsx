import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../features/auth/useAuth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const { mutate: login, isPending } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    login(formData, {
      onSuccess: () => {
        navigate('/feed');
      },
      onError: (err) => {
        setErrorMsg(err.response?.data?.error || 'Something went wrong. Try again!');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Tape Decoration */}
      <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-24 h-8 bg-pencil/10 rotate-2 z-10" />
      
      <div className="w-full max-w-md bg-white border-[3px] border-pencil wobbly-md shadow-hard-lg p-8 relative">
        <h1 className="text-4xl mb-6 text-center text-pencil">Welcome Back ✏️</h1>
        
        {errorMsg && (
          <div className="bg-marker/10 border-2 border-marker wobbly-sm p-3 mb-6 text-marker font-body text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-heading text-lg mb-1 text-pencil">Email</label>
            <Input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div>
            <label className="block font-heading text-lg mb-1 text-pencil">Password</label>
            <Input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full mt-4" size="lg" isLoading={isPending}>
            Log In
          </Button>
        </form>

        <p className="mt-6 text-center font-body text-lg">
          Don't have an account?{' '}
          <Link to="/register" className="text-pen hover:underline decoration-wavy decoration-2">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
