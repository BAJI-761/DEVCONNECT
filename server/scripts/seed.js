require('dotenv').config({ override: true });
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Post = require('../src/models/Post');
const Notification = require('../src/models/Notification');

const users = [
  {
    name: 'Ada Lovelace',
    username: 'adalovelace',
    email: 'ada@example.com',
    password: 'password123',
    bio: 'First computer programmer. Believer in the Analytical Engine.',
    location: 'London, UK',
    skills: ['Algorithms', 'Mathematics', 'Babbage Engine'],
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Ada&backgroundColor=ffdfbf'
  },
  {
    name: 'Grace Hopper',
    username: 'gracehopper',
    email: 'grace@example.com',
    password: 'password123',
    bio: 'Rear Admiral, computer scientist. Found the first computer bug.',
    location: 'Arlington, VA',
    skills: ['COBOL', 'Compilers', 'Debugging'],
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Grace&backgroundColor=c0aede'
  },
  {
    name: 'Alan Turing',
    username: 'alanturing',
    email: 'alan@example.com',
    password: 'password123',
    bio: 'Father of theoretical computer science and artificial intelligence.',
    location: 'Bletchley Park',
    skills: ['Cryptography', 'Turing Machines', 'Math'],
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Alan&backgroundColor=b6e3f4'
  },
  {
    name: 'Linus Torvalds',
    username: 'linus',
    email: 'linus@example.com',
    password: 'password123',
    bio: 'Just for fun. Creator of Linux and Git.',
    location: 'Portland, OR',
    skills: ['C', 'Linux', 'Git', 'Kernel Development'],
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Linus&backgroundColor=ffd5dc'
  }
];

const posts = [
  {
    username: 'adalovelace',
    content: 'Just had this wild idea about calculating Bernoulli numbers using the Analytical Engine. The potential goes way beyond just numbers - imagine a machine manipulating symbols! 💡📝',
  },
  {
    username: 'gracehopper',
    content: 'Found an actual moth stuck in Relay #70 Panel F. Taped it in the logbook. First actual case of a "bug" being found. Time to debug the hardware! 🐛🔧',
    image: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'
  },
  {
    username: 'alanturing',
    content: 'Can machines think? Working on a new game to test this out. I call it the "Imitation Game". Let me know if you want to beta test it this weekend. 🤖🎲',
  },
  {
    username: 'linus',
    content: 'Writing a new version control system because everything else sucks. Calling it "git". Should take me about a week or two to make it usable. 🐧💻',
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany();
    await Post.deleteMany();
    await Notification.deleteMany();
    console.log('Cleared existing data');

    const createdUsers = await User.create(users);
    console.log(`Created ${createdUsers.length} users`);

    const postsWithUserIds = posts.map(post => {
      const user = createdUsers.find(u => u.username === post.username);
      return {
        ...post,
        user: user._id
      };
    });

    const createdPosts = await Post.create(postsWithUserIds);
    console.log(`Created ${createdPosts.length} posts`);

    // Add some random followers and likes
    for (let i = 0; i < createdUsers.length; i++) {
      const currentUser = createdUsers[i];
      const otherUsers = createdUsers.filter(u => u._id !== currentUser._id);
      
      // Follow random users
      const toFollow = otherUsers.slice(0, 2);
      for (const u of toFollow) {
        currentUser.following.push(u._id);
        u.followers.push(currentUser._id);
        await u.save();
      }
      await currentUser.save();
      
      // Like random posts
      const randomPost = createdPosts[Math.floor(Math.random() * createdPosts.length)];
      if (!randomPost.likes.includes(currentUser._id)) {
        randomPost.likes.push(currentUser._id);
        
        // Add comment
        randomPost.comments.push({
          user: currentUser._id,
          content: 'This is brilliant! 🚀',
        });
        
        await randomPost.save();
      }
    }
    
    console.log('Added relationships (followers, likes, comments)');
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
