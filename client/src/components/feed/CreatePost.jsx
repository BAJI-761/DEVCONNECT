import { useState, useRef } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useCreatePost } from '../../features/feed/useFeed';
import { Card } from '../ui/Card';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { ImagePlus, X } from 'lucide-react';

export default function CreatePost() {
  const user = useAuthStore((state) => state.user);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  
  const { mutate: createPost, isPending } = useCreatePost();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);

    createPost(formData, {
      onSuccess: () => {
        setContent('');
        clearImage();
      }
    });
  };

  return (
    <Card decoration="tape" className="mb-8 p-4 sm:p-6 bg-paper/50">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <Avatar src={user?.avatar} initials={user?.name?.[0]} size="md" className="hidden sm:flex" />
          <div className="flex-1">
            <textarea
              className="w-full bg-white border-2 border-pencil border-dashed p-3 font-body text-pencil focus:outline-none focus:border-pen focus:ring-2 focus:ring-pen/20 wobbly resize-none placeholder:text-pencil/50 text-lg min-h-[100px]"
              placeholder="What are you working on right now?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isPending}
            />
            
            {preview && (
              <div className="relative mt-3 inline-block">
                <div className="border-[3px] border-pencil p-1 wobbly shadow-hard-sm bg-white">
                  <img src={preview} alt="Preview" className="max-h-64 object-cover" />
                </div>
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute -top-3 -right-3 bg-marker text-white rounded-full p-1 border-2 border-pencil hover:scale-110 transition-transform"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <div className="flex justify-between items-center mt-4">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 text-pen hover:text-pencil transition-colors font-heading text-lg group"
                  disabled={isPending}
                >
                  <div className="p-2 border-2 border-dashed border-pen rounded-full group-hover:bg-pen/10 wobbly-sm">
                    <ImagePlus size={20} />
                  </div>
                  <span className="hidden sm:inline">Attach Sketch</span>
                </button>
              </div>
              
              <Button type="submit" isLoading={isPending} disabled={!content.trim() && !image}>
                Post
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
}
