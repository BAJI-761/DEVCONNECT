import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../features/auth/useAuth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const { mutate: register, isPending } = useRegister();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (formData.password !== formData.confirmPassword) {
      return setErrorMsg('Passwords do not match');
    }

    const { confirmPassword, ...dataToSubmit } = formData;
    
    register(dataToSubmit, {
      onSuccess: () => {
        navigate('/feed');
      },
      onError: (err) => {
        setErrorMsg(err.response?.data?.error || 'Registration failed. Try again!');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      {/* Thumbtack Decoration */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-marker rounded-full shadow-sm z-10">
        <div className="w-1.5 h-1.5 bg-white/60 rounded-full ml-1 mt-0.5" />
      </div>
      
      <div className="w-full max-w-lg bg-postit border-[3px] border-pencil wobbly shadow-hard-lg p-8 relative">
        <h1 className="text-4xl mb-6 text-center text-pencil">Join DevConnect 🚀</h1>
        
        {errorMsg && (
          <div className="bg-white border-2 border-marker wobbly-sm p-3 mb-6 text-marker font-body text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-heading text-lg mb-1 text-pencil">Full Name</label>
            <Input 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ada Lovelace"
              required
            />
          </div>

          <div>
            <label className="block font-heading text-lg mb-1 text-pencil">Username</label>
            <Input 
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="adalovelace"
              required
            />
          </div>
          
          <div>
            <label className="block font-heading text-lg mb-1 text-pencil">Email</label>
            <Input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ada@example.com"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-heading text-lg mb-1 text-pencil">Password</label>
              <Input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="block font-heading text-lg mb-1 text-pencil">Confirm Password</label>
              <Input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full mt-6" size="lg" isLoading={isPending}>
            Sign Up
          </Button>
        </form>

        <p className="mt-6 text-center font-body text-lg">
          Already sketching?{' '}
          <Link to="/login" className="text-pen hover:underline decoration-wavy decoration-2">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
