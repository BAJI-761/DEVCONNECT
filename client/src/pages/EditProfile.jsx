import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useUpdateProfile } from '../features/profile/useProfile';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function EditProfile() {
  const user = useAuthStore((state) => state.user);
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    website: '',
    github: '',
    skills: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        github: user.github || '',
        skills: user.skills ? user.skills.join(', ') : '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData, {
      onSuccess: () => {
        navigate(`/profile/${user.username}`);
      }
    });
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white border-[3px] border-pencil p-8 shadow-hard wobbly-sm relative">
        {/* Decorative Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-pencil/10 rotate-2 z-10" />
        
        <h1 className="text-3xl font-heading mb-6 text-pencil underline decoration-wavy decoration-pen">
          Edit Your Sketchbook
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-heading text-lg mb-1">Display Name</label>
            <Input name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div>
            <label className="block font-heading text-lg mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full border-[3px] border-pencil bg-white p-3 font-body text-pencil focus:outline-none focus:border-pen focus:ring-2 focus:ring-pen/20 wobbly resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block font-heading text-lg mb-1">Location</label>
              <Input name="location" value={formData.location} onChange={handleChange} placeholder="e.g. San Francisco, CA" />
            </div>
            <div>
              <label className="block font-heading text-lg mb-1">GitHub Username</label>
              <Input name="github" value={formData.github} onChange={handleChange} placeholder="torvalds" />
            </div>
          </div>

          <div>
            <label className="block font-heading text-lg mb-1">Personal Website</label>
            <Input name="website" type="url" value={formData.website} onChange={handleChange} placeholder="https://..." />
          </div>

          <div>
            <label className="block font-heading text-lg mb-1">Skills (comma separated)</label>
            <Input name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node.js, Design" />
          </div>

          <div className="pt-4 flex gap-4">
            <Button type="button" variant="secondary" onClick={() => navigate(-1)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" isLoading={isPending} className="flex-1">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
