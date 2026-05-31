import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUserProfile, useFollowUser, useUploadAvatar, useUploadCover } from '../features/profile/useProfile';
import { useAuthStore } from '../stores/authStore';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import { MapPin, Link as LinkIcon, Calendar, Camera } from 'lucide-react';
import formatDate from '../lib/formatDate';

export default function Profile() {
  const { username } = useParams();
  const { data: profile, isLoading, error } = useUserProfile(username);
  const currentUser = useAuthStore((state) => state.user);
  
  const { mutate: followUser, isPending: followLoading } = useFollowUser();
  const { mutate: uploadAvatar, isPending: avatarLoading } = useUploadAvatar();
  const { mutate: uploadCover, isPending: coverLoading } = useUploadCover();

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-64 w-full" />
        <div className="flex gap-6">
          <Skeleton className="w-32 h-32 rounded-full -mt-16 border-4 border-paper z-10" />
          <div className="space-y-4 flex-1">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return <div className="text-center py-20 text-xl font-heading text-marker border-[3px] border-marker border-dashed wobbly-sm p-10 bg-marker/5">Profile not found or error loading profile.</div>;
  }

  const isOwnProfile = currentUser?._id === profile._id;
  const isFollowing = profile.followers.some((follower) => follower._id === currentUser?._id);

  const handleFollowToggle = () => {
    followUser({ userId: profile._id, action: isFollowing ? 'unfollow' : 'follow' });
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      uploadAvatar(formData);
    }
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('coverImage', file);
      uploadCover(formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 w-full border-[3px] border-pencil bg-pencil/10 wobbly shadow-hard overflow-hidden group">
        {profile.coverImage ? (
          <img src={profile.coverImage} alt="Cover" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full pattern-dots bg-paper opacity-50" />
        )}
        
        {isOwnProfile && (
          <button 
            onClick={() => coverInputRef.current?.click()}
            className="absolute bottom-4 right-4 bg-paper/80 p-2 border-2 border-pencil rounded-full hover:bg-paper transition-colors shadow-hard-sm"
          >
            <Camera size={20} className="text-pencil" />
          </button>
        )}
        <input type="file" ref={coverInputRef} onChange={handleCoverUpload} accept="image/*" className="hidden" />
      </div>

      {/* Profile Info Header */}
      <div className="relative px-4 sm:px-8 flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-end -mt-16 sm:-mt-20 mb-8">
        
        {/* Avatar */}
        <div className="relative group self-start sm:self-auto">
          <Avatar 
            src={profile.avatar} 
            initials={profile.name?.[0]} 
            className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-paper shadow-hard z-10 bg-white" 
          />
          {isOwnProfile && (
            <button 
              onClick={() => avatarInputRef.current?.click()}
              className="absolute bottom-2 right-2 z-20 bg-paper p-2 border-2 border-pencil rounded-full hover:bg-muted transition-colors shadow-hard-sm"
              disabled={avatarLoading}
            >
              <Camera size={18} className="text-pencil" />
            </button>
          )}
          <input type="file" ref={avatarInputRef} onChange={handleAvatarUpload} accept="image/*" className="hidden" />
        </div>

        {/* Name & Buttons */}
        <div className="flex-1 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 z-10 pt-16 sm:pt-0">
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading text-pencil leading-none mb-1">{profile.name}</h1>
            <p className="text-xl text-pencil/60 font-body">@{profile.username}</p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isOwnProfile ? (
              <Link to="/profile/edit" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto">Edit Profile</Button>
              </Link>
            ) : (
              <Button 
                onClick={handleFollowToggle} 
                variant={isFollowing ? 'secondary' : 'default'}
                isLoading={followLoading}
                className="w-full sm:w-auto"
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="px-4 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: About */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-postit p-6 border-[3px] border-pencil shadow-hard wobbly-sm relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-pencil/10 rotate-3 z-10" />
            
            <h2 className="font-heading text-xl mb-3 decoration-wavy underline decoration-marker/40">About</h2>
            <p className="font-body text-pencil whitespace-pre-wrap">{profile.bio || "No bio available. They prefer to let their code speak."}</p>
            
            <div className="mt-6 space-y-3 font-body text-sm text-pencil/80">
              {profile.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} /> <span>{profile.location}</span>
                </div>
              )}
              {profile.website && (
                <div className="flex items-center gap-2">
                  <LinkIcon size={16} /> <a href={profile.website} target="_blank" rel="noreferrer" className="hover:text-pen underline">{profile.website.replace(/^https?:\/\//, '')}</a>
                </div>
              )}
              {profile.github && (
                <div className="flex items-center gap-2">
                  <LinkIcon size={16} /> <a href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer" className="hover:text-pen underline">{profile.github}</a>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar size={16} /> <span>Joined {formatDate(profile.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border-[3px] border-pencil shadow-hard wobbly-md">
            <h2 className="font-heading text-xl mb-3">Skills</h2>
            {profile.skills && profile.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <Badge key={index} rotation={index % 2 === 0 ? 'rotate-1' : '-rotate-2'}>
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="font-body text-pencil/60 text-sm">No skills listed yet.</p>
            )}
          </div>

          <div className="flex gap-4 font-heading text-lg p-4 border-[3px] border-pencil border-dashed wobbly text-center justify-around bg-pencil/5">
            <div>
              <span className="block text-2xl text-pen">{profile.following?.length || 0}</span>
              <span className="text-pencil/60 text-sm uppercase tracking-wider">Following</span>
            </div>
            <div>
              <span className="block text-2xl text-marker">{profile.followers?.length || 0}</span>
              <span className="text-pencil/60 text-sm uppercase tracking-wider">Followers</span>
            </div>
          </div>
        </div>

        {/* Right Column: Feed/Posts Placeholder */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="font-heading text-3xl mb-4 text-pencil relative inline-block">
            Recent Sketches
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-pen/40" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0,10 Q25,20 50,10 T100,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </h2>
          
          <div className="border-[3px] border-pencil border-dashed p-12 text-center wobbly text-pencil/60 font-heading text-xl bg-white/50">
            Post feed will be implemented in Phase 3...
          </div>
        </div>

      </div>
    </div>
  );
}
