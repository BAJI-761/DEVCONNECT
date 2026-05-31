# DevConnect — Full-Stack Developer Social Platform

A social platform for **developers, students, and tech enthusiasts** to create profiles, share posts (including code snippets), comment, like, follow, and discover trending content — wrapped in a **Hand-Drawn / Sketched** visual identity that feels like a creative sketchbook brought to life.

---

## Environment Credentials

As requested, the specific credentials for this project to be used in the `.env` file:
IMPORTANT: Credentials have been removed from this file for security.

Place all sensitive values in a local `.env` file (which must NOT be committed). Example variables you should provide in `.env`:

```
# MongoDB
MONGO_URI=your_mongodb_connection_string_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# JWT
JWT_SECRET=your_jwt_secret_here

# Other
PORT=5000
```

If the credentials from earlier commits are live, rotate them immediately. Do NOT commit real secrets to the repository.

---

## Design System: Hand-Drawn / Sketched

**Philosophy**: Authentic imperfection. Wobbly borders, paper textures, marker fonts, hard offset shadows, playful rotations. Every element looks like it was sketched on notebook paper during a brainstorming session. This style invites users to feel like **collaborators, not consumers**.

| Token | Value | Usage |
|---|---|---|
| **Background** | `#fdfbf7` (Warm Paper) | Page background, card interiors |
| **Foreground** | `#2d2d2d` (Soft Pencil Black) | All text, borders |
| **Muted** | `#e5e0d8` (Old Paper / Erased Pencil) | Disabled states, dividers, subtle backgrounds |
| **Accent** | `#ff4d4d` (Red Correction Marker) | Primary CTA, likes, errors, notifications |
| **Border** | `#2d2d2d` (Pencil Lead) | All borders (thick, wobbly) |
| **Secondary** | `#2d5da1` (Blue Ballpoint Pen) | Links, focus rings, secondary actions |
| **Post-it** | `#fff9c4` (Sticky Note Yellow) | Feature cards, highlights, tags |
| **Heading Font** | `Kalam` (700) | Thick felt-tip marker headings |
| **Body Font** | `Patrick Hand` (400) | Handwritten body text |

**Key Visual Signatures**:
- **Wobbly borders**: `border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px` — never standard `rounded-*`
- **Hard offset shadows**: `box-shadow: 4px 4px 0px 0px #2d2d2d` — NO blur, ever
- **Paper dot texture**: `radial-gradient(#e5e0d8 1px, transparent 1px)` with `24px 24px` spacing
- **Playful rotations**: `-2deg` to `2deg` on cards, images, decorative elements
- **Tape & thumbtack decorations**: Translucent tape strips and colored pins on cards
- **Dashed accents**: `border-dashed` on secondary elements and dividers
- **SVG scribbles**: Hand-drawn arrows, squiggly lines, corner frames

---

## Upgraded Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Frontend** | React 19 + Vite 6 | Instant HMR, fast builds, React 19 compiler |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) | CSS-first config, `@theme` for design tokens |
| **Routing** | React Router v7 | Lazy loading, loaders, nested routes |
| **Server State** | TanStack Query v5 | Caching, background refetch, optimistic updates |
| **Client State** | Zustand | Lightweight store for auth, theme, notifications |
| **HTTP Client** | Axios (interceptors) | JWT refresh flow, request middleware |
| **Backend** | Node.js + Express.js | REST API, middleware architecture |
| **Auth** | JWT (access + refresh) + bcryptjs | Access in memory, refresh in `httpOnly` cookie |
| **Database** | MongoDB Atlas + Mongoose | Schema validation, aggregation pipeline |
| **Real-Time** | Socket.IO | Live notifications, online status (PHASE 4) |
| **Image Uploads** | Cloudinary (server-side via multer) | Auto-optimization, face-crop, CDN delivery |
| **Code Highlighting** | `react-syntax-highlighter` + Prism | Syntax-highlighted code blocks in posts |
| **Markdown** | `react-markdown` + `remark-gfm` | Rich text posts with GFM support |
| **Icons** | Lucide React (`strokeWidth={2.5}`) | Clean icons, enclosed in rough circles |
| **Fonts** | Google Fonts: Kalam + Patrick Hand | Handwritten aesthetic |

> [!NOTE]
> JavaScript (not TypeScript) throughout — matching your spec. JSDoc comments for type hints where helpful.

---

## Deployment & Infrastructure Strategy

- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas
- **Image Uploads**: Cloudinary + Multer (production-ready image handling)
- **Real-Time**: Socket.IO (deferred to Phase 4, after core CRUD stabilization)
- **MVP-First Implementation**: Authentication -> User Profiles -> Posts -> Comments -> Likes -> Follow System

---

## Project Structure

```
e:\DEVCONNECT\
│
├── client/                          # React + Vite frontend
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                  # Primitives
│   │   │   │   ├── Button.jsx       # Wobbly oval, hard shadow, press-flat active
│   │   │   │   ├── Card.jsx         # Wobbly border, tape/tack decoration
│   │   │   │   ├── Input.jsx        # Wobbly bordered input, blue focus
│   │   │   │   ├── Avatar.jsx       # Irregular circle, pencil border
│   │   │   │   ├── Badge.jsx        # Post-it yellow tag, slight rotation
│   │   │   │   ├── Skeleton.jsx     # Paper-colored shimmer loading state
│   │   │   │   └── Toast.jsx        # Notification toast, sticky-note style
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx       # Paper-textured nav, wavy underlines
│   │   │   │   ├── Sidebar.jsx      # Notebook-margin sidebar
│   │   │   │   ├── PageShell.jsx    # 3-column responsive layout
│   │   │   │   └── Footer.jsx       # Dashed border top, sketched links
│   │   │   ├── feed/
│   │   │   │   ├── PostCard.jsx     # Wobbly card, tape decoration, actions
│   │   │   │   ├── PostForm.jsx     # Notepad-style compose area
│   │   │   │   └── FeedList.jsx     # Infinite scroll, skeleton loading
│   │   │   ├── profile/
│   │   │   │   ├── ProfileHeader.jsx # Cover + avatar overlap, stats
│   │   │   │   ├── SkillBadges.jsx  # Post-it colored tags
│   │   │   │   └── UserCard.jsx     # Compact user card for sidebars
│   │   │   ├── comments/
│   │   │   │   ├── CommentList.jsx  # Threaded comments, dashed dividers
│   │   │   │   └── CommentForm.jsx  # Inline comment input
│   │   │   └── sketches/            # Hand-drawn decorative elements
│   │   │       ├── WobblyBorder.jsx # Reusable wobbly border wrapper
│   │   │       ├── TapeDecoration.jsx # Translucent tape strip
│   │   │       ├── Thumbtack.jsx    # Colored pin decoration
│   │   │       ├── ScribbleArrow.jsx # SVG hand-drawn arrow
│   │   │       ├── SquigglyLine.jsx # SVG wavy connector line
│   │   │       ├── PaperTexture.jsx # Dot-pattern background overlay
│   │   │       └── StickyNote.jsx   # Post-it yellow note component
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── useAuth.js       # Auth hook (TanStack + Zustand)
│   │   │   │   ├── AuthGuard.jsx    # Protected route wrapper
│   │   │   │   └── GuestGuard.jsx   # Redirect if authenticated
│   │   │   ├── posts/
│   │   │   │   ├── usePostActions.js # Like, save, delete mutations
│   │   │   │   └── useFeed.js       # Infinite feed query
│   │   │   ├── users/
│   │   │   │   ├── useUserProfile.js # Profile query + follow actions
│   │   │   │   └── useSuggestedUsers.js
│   │   │   ├── comments/
│   │   │   │   └── useComments.js   # Comments CRUD
│   │   │   ├── notifications/
│   │   │   │   └── useNotifications.js
│   │   │   └── search/
│   │   │       └── useSearch.js     # Debounced search query
│   │   ├── hooks/
│   │   │   ├── useDebounce.js
│   │   │   ├── useInfiniteScroll.js # Intersection Observer
│   │   │   └── useSocket.js        # Socket.IO event listener
│   │   ├── lib/
│   │   │   ├── api.js              # Axios instance + interceptors
│   │   │   ├── socket.js           # Socket.IO client singleton
│   │   │   ├── cn.js               # clsx + tailwind-merge
│   │   │   ├── constants.js        # Wobbly radius values, accent arrays
│   │   │   └── formatDate.js       # Relative time formatting
│   │   ├── stores/
│   │   │   ├── authStore.js        # User, token, isAuthenticated
│   │   │   └── notificationStore.js # Unread count, toast queue
│   │   ├── pages/
│   │   │   ├── Landing.jsx         # Hero with scribble arrow, feature cards
│   │   │   ├── Login.jsx           # Notebook-page login form
│   │   │   ├── Register.jsx        # Sketch-pad registration
│   │   │   ├── Feed.jsx            # 3-column: sidebar | feed | suggestions
│   │   │   ├── Profile.jsx         # Cover, stats, tabbed posts
│   │   │   ├── EditProfile.jsx     # Form with avatar/cover upload
│   │   │   ├── PostDetail.jsx      # Full post + comments
│   │   │   ├── Explore.jsx         # Search + trending tags
│   │   │   ├── Notifications.jsx   # Notification list
│   │   │   ├── SavedPosts.jsx      # Bookmarked posts
│   │   │   └── NotFound.jsx        # Sketched 404 illustration
│   │   ├── styles/
│   │   │   └── index.css           # Tailwind v4 + design tokens + animations
│   │   ├── App.jsx                 # Router setup
│   │   └── main.jsx                # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                          # Express.js backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js               # MongoDB connection
│   │   │   ├── cloudinary.js       # Cloudinary config
│   │   │   └── socket.js           # Socket.IO setup
│   │   ├── middleware/
│   │   │   ├── auth.js             # JWT verification
│   │   │   ├── upload.js           # Multer + Cloudinary
│   │   │   ├── validate.js         # express-validator rules
│   │   │   └── errorHandler.js     # Global error handler
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Post.js
│   │   │   ├── Comment.js
│   │   │   └── Notification.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── users.js
│   │   │   ├── posts.js
│   │   │   ├── comments.js
│   │   │   ├── notifications.js
│   │   │   └── search.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── postController.js
│   │   │   ├── commentController.js
│   │   │   ├── notificationController.js
│   │   │   └── searchController.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── postService.js
│   │   │   └── notificationService.js
│   │   ├── utils/
│   │   │   ├── generateToken.js
│   │   │   ├── asyncHandler.js
│   │   │   └── ApiError.js
│   │   └── app.js
│   ├── scripts/
│   │   └── seed.js                 # Seed data script for users, posts, comments, likes, follows, notifications
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Database Architecture

### User Model

```javascript
{
  _id: ObjectId,
  name: String,               // "Baji Shaik"
  username: String,            // "bajishaik" (unique, lowercase, indexed)
  email: String,               // unique, indexed
  password: String,            // bcrypt hashed
  bio: String,                 // max 160 chars
  avatar: String,              // Cloudinary URL
  coverImage: String,          // Cloudinary URL
  skills: [String],            // ["React", "Node.js", "MongoDB"]
  location: String,            // "Hyderabad, India"
  website: String,             // "https://baji.dev"
  github: String,              // GitHub username
  followers: [ObjectId],       // refs → User
  following: [ObjectId],       // refs → User
  savedPosts: [ObjectId],      // refs → Post (bookmarks)
  isOnline: Boolean,           // Socket.IO managed
  lastSeen: Date,
  createdAt: Date,
  updatedAt: Date
}
// Indexes: { username: 1 }, { email: 1 }, { skills: 1 },
//          { name: 'text', username: 'text', bio: 'text' }
```

### Post Model

```javascript
{
  _id: ObjectId,
  author: ObjectId,            // ref → User (indexed)
  content: String,             // Markdown-enabled (max 5000 chars)
  image: String,               // Cloudinary URL (optional)
  codeSnippet: {               // Dev-focused differentiator
    code: String,
    language: String           // "javascript", "python", etc.
  },
  tags: [String],              // ["react", "tutorial"] (hashtags)
  likes: [ObjectId],           // refs → User
  commentsCount: Number,       // denormalized
  isEdited: Boolean,
  createdAt: Date,
  updatedAt: Date
}
// Indexes: { author: 1, createdAt: -1 }, { tags: 1 },
//          { createdAt: -1 }, { content: 'text', tags: 'text' }
```

### Comment Model

```javascript
{
  _id: ObjectId,
  postId: ObjectId,            // ref → Post (indexed)
  userId: ObjectId,            // ref → User
  content: String,             // max 1000 chars
  likes: [ObjectId],           // refs → User (comment likes)
  createdAt: Date
}
// Indexes: { postId: 1, createdAt: 1 }
```

### Notification Model

```javascript
{
  _id: ObjectId,
  recipient: ObjectId,         // ref → User (indexed)
  sender: ObjectId,            // ref → User
  type: String,                // "like" | "comment" | "follow" | "mention"
  post: ObjectId,              // ref → Post (optional)
  comment: ObjectId,           // ref → Comment (optional)
  message: String,             // "bajishaik liked your post"
  read: Boolean,               // default: false
  createdAt: Date
}
// Indexes: { recipient: 1, read: 1, createdAt: -1 }
```

---

## API Design

### Auth Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Create account | ❌ |
| `POST` | `/api/auth/login` | Login → access + refresh token | ❌ |
| `POST` | `/api/auth/logout` | Clear refresh token cookie | ✅ |
| `POST` | `/api/auth/refresh` | Refresh access token | ❌ (cookie) |
| `GET` | `/api/auth/me` | Get current user | ✅ |

### User Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/users/:username` | Get user profile | ✅ |
| `PUT` | `/api/users/profile` | Update own profile | ✅ |
| `PUT` | `/api/users/avatar` | Upload avatar (multipart) | ✅ |
| `PUT` | `/api/users/cover` | Upload cover image (multipart) | ✅ |
| `POST` | `/api/users/:id/follow` | Follow a user | ✅ |
| `POST` | `/api/users/:id/unfollow` | Unfollow a user | ✅ |
| `GET` | `/api/users/:id/followers` | Paginated followers | ✅ |
| `GET` | `/api/users/:id/following` | Paginated following | ✅ |
| `GET` | `/api/users/suggested` | Suggested users to follow | ✅ |

### Post Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/posts` | Feed (following-based, paginated) | ✅ |
| `GET` | `/api/posts/explore` | Explore / trending posts | ✅ |
| `GET` | `/api/posts/user/:userId` | User's posts | ✅ |
| `GET` | `/api/posts/:id` | Single post + comments | ✅ |
| `POST` | `/api/posts` | Create post (multipart) | ✅ |
| `PUT` | `/api/posts/:id` | Edit own post | ✅ |
| `DELETE` | `/api/posts/:id` | Delete own post | ✅ |
| `POST` | `/api/posts/:id/like` | Like / unlike (toggle) | ✅ |
| `POST` | `/api/posts/:id/save` | Save / unsave (toggle) | ✅ |
| `GET` | `/api/posts/saved` | Get saved posts | ✅ |

### Comment Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/comments/:postId` | Comments for post (paginated) | ✅ |
| `POST` | `/api/comments/:postId` | Add comment | ✅ |
| `DELETE` | `/api/comments/:id` | Delete own comment | ✅ |
| `POST` | `/api/comments/:id/like` | Like comment (toggle) | ✅ |

### Notification Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/notifications` | Get notifications (paginated) | ✅ |
| `PUT` | `/api/notifications/read-all` | Mark all as read | ✅ |
| `PUT` | `/api/notifications/:id/read` | Mark one as read | ✅ |
| `GET` | `/api/notifications/unread-count` | Unread count | ✅ |

### Search Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/search?q=&type=` | Search users/posts/tags | ✅ |
| `GET` | `/api/search/tags/trending` | Trending hashtags | ✅ |

---

## Proposed Changes — Build Phases

### Phase 1: Foundation, Design System & Auth (~25 files)

This phase scaffolds both projects, implements the full CSS design system, and builds authentication end-to-end.

---

#### Infrastructure

##### [NEW] `client/` — Vite + React scaffold
- `npm create vite@latest ./ -- --template react`
- Install: `tailwindcss @tailwindcss/vite react-router axios @tanstack/react-query zustand lucide-react clsx tailwind-merge react-markdown remark-gfm react-syntax-highlighter`
- Configure `vite.config.js` with Tailwind v4 plugin + `@` path alias

##### [NEW] `server/` — Express scaffold
- `npm init -y`
- Install: `express mongoose bcryptjs jsonwebtoken dotenv cors cookie-parser helmet morgan express-validator socket.io cloudinary multer multer-storage-cloudinary faker`

---

#### Design System CSS

##### [NEW] [client/src/styles/index.css](file:///e:/DEVCONNECT/client/src/styles/index.css)
The core design system file (~250 lines). Contains:

**Tailwind v4 `@theme` block** — all design tokens as CSS custom properties:
```css
@import "tailwindcss";

@theme {
  --color-paper: #fdfbf7;
  --color-pencil: #2d2d2d;
  --color-muted: #e5e0d8;
  --color-marker: #ff4d4d;
  --color-pen: #2d5da1;
  --color-postit: #fff9c4;
  --font-heading: 'Kalam', cursive;
  --font-body: 'Patrick Hand', cursive;
  --shadow-hard: 4px 4px 0px 0px #2d2d2d;
  --shadow-hard-lg: 8px 8px 0px 0px #2d2d2d;
  --shadow-hard-sm: 2px 2px 0px 0px #2d2d2d;
  --shadow-hard-subtle: 3px 3px 0px 0px rgba(45, 45, 45, 0.1);
}
```

**Google Fonts import**: Kalam (700) + Patrick Hand (400)

**Base styles**:
- `body`: warm paper background + dot texture (`radial-gradient`), `font-family: var(--font-body)`, `color: var(--color-pencil)`
- All headings: `font-family: var(--font-heading)`
- Global smooth scrolling

**Utility classes**:
- `.wobbly` — `border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px`
- `.wobbly-md` — `border-radius: 15px 225px 15px 255px / 255px 15px 225px 15px` (alternate wobble)
- `.wobbly-sm` — `border-radius: 185px 10px 195px 10px / 10px 195px 10px 185px`
- `.shadow-hard` / `.shadow-hard-lg` / `.shadow-hard-sm` — hard offset shadows
- `.paper-texture` — the dot-pattern background

**Keyframe animations**:
```css
@keyframes gentle-bounce {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}

@keyframes jiggle {
  0%, 100% { transform: rotate(-1deg); }
  50%      { transform: rotate(1deg); }
}

@keyframes tape-shimmer {
  0%   { opacity: 0.4; }
  50%  { opacity: 0.6; }
  100% { opacity: 0.4; }
}
```

**Reduced motion** media query — disables all keyframes, keeps transitions fast (150ms).

---

#### Constants & Utilities

##### [NEW] [client/src/lib/constants.js](file:///e:/DEVCONNECT/client/src/lib/constants.js)
```javascript
export const WOBBLY_RADIUS = {
  default: '255px 15px 225px 15px / 15px 225px 15px 255px',
  md: '15px 225px 15px 255px / 255px 15px 225px 15px',
  sm: '185px 10px 195px 10px / 10px 195px 10px 185px',
  circle: '60% 40% 55% 45% / 45% 55% 40% 60%',
};

export const COLORS = {
  paper: '#fdfbf7',
  pencil: '#2d2d2d',
  muted: '#e5e0d8',
  marker: '#ff4d4d',
  pen: '#2d5da1',
  postit: '#fff9c4',
};
```

##### [NEW] [client/src/lib/cn.js](file:///e:/DEVCONNECT/client/src/lib/cn.js)
- `clsx` + `tailwind-merge` for conditional class merging

##### [NEW] [client/src/lib/api.js](file:///e:/DEVCONNECT/client/src/lib/api.js)
- Axios instance: `baseURL: '/api'`, `withCredentials: true`
- Request interceptor: attach access token from Zustand
- Response interceptor: on 401 → attempt `/auth/refresh` → retry or redirect to login

##### [NEW] [client/src/lib/formatDate.js](file:///e:/DEVCONNECT/client/src/lib/formatDate.js)
- Relative time: "just now", "5m ago", "2h ago", "3d ago", then full date

##### [NEW] [client/src/stores/authStore.js](file:///e:/DEVCONNECT/client/src/stores/authStore.js)
- Zustand: `{ user, accessToken, isAuthenticated, setAuth, clearAuth }`
- Persist user to `localStorage` for hydration (not the token)

---

#### Auth Feature

##### [NEW] [client/src/features/auth/useAuth.js](file:///e:/DEVCONNECT/client/src/features/auth/useAuth.js)
- TanStack Query mutations: `useLogin`, `useRegister`, `useLogout`
- Query: `useCurrentUser` (calls `/auth/me` on mount)

##### [NEW] [client/src/features/auth/AuthGuard.jsx](file:///e:/DEVCONNECT/client/src/features/auth/AuthGuard.jsx)
- Renders children if authenticated, redirects to `/login` otherwise

##### [NEW] [client/src/features/auth/GuestGuard.jsx](file:///e:/DEVCONNECT/client/src/features/auth/GuestGuard.jsx)
- Redirects to `/feed` if already logged in

---

#### Auth Pages

##### [NEW] [client/src/pages/Landing.jsx](file:///e:/DEVCONNECT/client/src/pages/Landing.jsx)
- **Hero**: Split layout. Left: massive Kalam heading "Where Devs *Connect*" with the word "Connect" underlined in red marker squiggle (SVG). Subheading in Patrick Hand. Two wobbly buttons (Join / Login). Hand-drawn SVG arrow pointing at CTA (`hidden md:block`).
- **Right side**: Sketched placeholder frame with corner brackets (SVG), slight rotation (`rotate-2`), bouncing decorative circle nearby.
- **Features section**: 3 post-it yellow cards with tape decoration, each slightly rotated (`-rotate-1`, `rotate-0`, `rotate-1`), icons in rough circles.
- **How it works**: Numbered steps connected by squiggly SVG line (`hidden md:block`), each step in a wobbly card with thumbtack.
- **CTA banner**: Blue pen colored section with dashed border, "Ready to sketch your network?" heading.

##### [NEW] [client/src/pages/Login.jsx](file:///e:/DEVCONNECT/client/src/pages/Login.jsx)
- Centered card on paper background, notebook ruled-lines effect on left margin
- Tape decoration at top
- Kalam heading: "Welcome Back ✏️"
- Wobbly-bordered inputs (email, password) with pencil-border focus → pen-blue
- Wobbly button with hard shadow, press-flat on click
- "Don't have an account?" link with wavy underline
- Decorative doodles in corners (`hidden md:block`)

##### [NEW] [client/src/pages/Register.jsx](file:///e:/DEVCONNECT/client/src/pages/Register.jsx)
- Similar sketch-pad aesthetic
- Fields: name, username, email, password, confirm password
- Client-side validation with red marker error messages
- Thumbtack decoration

---

#### Backend Auth

##### [NEW] [server/src/config/db.js](file:///e:/DEVCONNECT/server/src/config/db.js)
- Mongoose connection with retry logic, event listeners

##### [NEW] [server/src/models/User.js](file:///e:/DEVCONNECT/server/src/models/User.js)
- Pre-save: hash password with bcrypt (saltRounds: 12)
- Method: `matchPassword(enteredPassword)`
- Virtuals: `followerCount`, `followingCount`

##### [NEW] [server/src/controllers/authController.js](file:///e:/DEVCONNECT/server/src/controllers/authController.js)
- `register` — validate, check duplicates, create user, return access token + set refresh cookie
- `login` — validate credentials, return tokens
- `logout` — clear `httpOnly` refresh cookie
- `refreshToken` — verify refresh cookie, issue new access token
- `getMe` — return user from JWT payload

##### [NEW] [server/src/middleware/auth.js](file:///e:/DEVCONNECT/server/src/middleware/auth.js)
- Extract Bearer token, verify JWT, attach `req.user`

##### [NEW] [server/src/utils/generateToken.js](file:///e:/DEVCONNECT/server/src/utils/generateToken.js)
- `generateAccessToken(userId)` — 15min expiry
- `generateRefreshToken(userId)` — 7d expiry

##### [NEW] [server/src/utils/asyncHandler.js](file:///e:/DEVCONNECT/server/src/utils/asyncHandler.js)
- Wraps async route handlers to catch errors

##### [NEW] [server/src/utils/ApiError.js](file:///e:/DEVCONNECT/server/src/utils/ApiError.js)
- Custom error class with `statusCode` and `message`

##### [NEW] [server/src/middleware/errorHandler.js](file:///e:/DEVCONNECT/server/src/middleware/errorHandler.js)
- Global error handler: formats ApiError, Mongoose validation errors, JWT errors

##### [NEW] [server/src/app.js](file:///e:/DEVCONNECT/server/src/app.js)
- Express setup: cors, helmet, morgan, cookie-parser, JSON parser
- Route mounting
- Error handler
- Server start with MongoDB connection

---

### Phase 2: UI Components & User Profiles (~22 files)

#### Core UI Components

##### [NEW] [client/src/components/ui/Button.jsx](file:///e:/DEVCONNECT/client/src/components/ui/Button.jsx)
- **Default**: White bg, `border-[3px]` pencil border, `wobbly` radius, `shadow-hard`, Patrick Hand font
- **Hover**: fills red marker (`#ff4d4d`), text white, shadow reduces to `shadow-hard-sm`, translate `2px 2px`
- **Active**: shadow gone, translate `4px 4px` (press-flat)
- **Secondary**: muted bg, hovers blue pen (`#2d5da1`)
- **Ghost**: no border, dashed underline on hover
- Sizes: `sm`, `md`, `lg`
- Loading: spinner with jiggle animation
- All focus states: `ring-2 ring-pen/20`, no outline (maintains wobble)

##### [NEW] [client/src/components/ui/Card.jsx](file:///e:/DEVCONNECT/client/src/components/ui/Card.jsx)
- Composable: `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`
- Base: white bg, `border-2` pencil, `wobbly-md` radius, `shadow-hard-subtle`
- Props: `decoration="tape"|"tack"|"none"`, `variant="default"|"postit"|"speech"`
- Post-it variant: yellow bg `#fff9c4`
- Speech variant: geometric tail (CSS border trick)
- Hover: `rotate-1` jiggle, shadow increases

##### [NEW] [client/src/components/ui/Input.jsx](file:///e:/DEVCONNECT/client/src/components/ui/Input.jsx)
- `border-2` pencil, `wobbly` radius, Patrick Hand font
- Placeholder: `text-pencil/40`
- Focus: border → pen blue, `ring-2 ring-pen/20`
- Textarea variant: `wobbly-md` radius, auto-resize
- Error state: border → marker red, error message below

##### [NEW] [client/src/components/ui/Avatar.jsx](file:///e:/DEVCONNECT/client/src/components/ui/Avatar.jsx)
- Irregular circle (`wobbly circle` radius), `border-2` pencil
- Sizes: `xs`(24), `sm`(32), `md`(40), `lg`(56), `xl`(80)
- Fallback: initials on muted background in Kalam font
- Online dot: green circle with `border-2` paper-colored border
- Slight rotation (`-rotate-1`)

##### [NEW] [client/src/components/ui/Badge.jsx](file:///e:/DEVCONNECT/client/src/components/ui/Badge.jsx)
- Post-it yellow bg, `border-2` pencil, `wobbly-sm` radius
- Slight random rotation via prop (`-1deg`, `0`, `1deg`)
- Text in Patrick Hand, small size
- Delete variant with `×` button

##### [NEW] [client/src/components/ui/Skeleton.jsx](file:///e:/DEVCONNECT/client/src/components/ui/Skeleton.jsx)
- Muted paper color with gentle pulse animation
- Wobbly borders matching the card aesthetic

##### [NEW] [client/src/components/ui/Toast.jsx](file:///e:/DEVCONNECT/client/src/components/ui/Toast.jsx)
- Sticky-note style notification
- Slide in from top-right, tape decoration
- Auto-dismiss after 4 seconds

---

#### Sketch Decorations (The "Personality" Layer)

##### [NEW] [client/src/components/sketches/TapeDecoration.jsx](file:///e:/DEVCONNECT/client/src/components/sketches/TapeDecoration.jsx)
- Translucent gray/tan rectangle: `bg-pencil/10`, `h-6 w-20`, slight rotation (`rotate-2`)
- Positioned at top-center of parent, overlapping the border
- `aria-hidden="true"`

##### [NEW] [client/src/components/sketches/Thumbtack.jsx](file:///e:/DEVCONNECT/client/src/components/sketches/Thumbtack.jsx)
- Small colored circle (red default): `w-4 h-4 rounded-full`, with tiny highlight dot
- Absolute positioned at top-center
- `aria-hidden="true"`

##### [NEW] [client/src/components/sketches/ScribbleArrow.jsx](file:///e:/DEVCONNECT/client/src/components/sketches/ScribbleArrow.jsx)
- SVG path with `stroke-dasharray`, pencil color
- Configurable direction and curve
- `hidden md:block`

##### [NEW] [client/src/components/sketches/SquigglyLine.jsx](file:///e:/DEVCONNECT/client/src/components/sketches/SquigglyLine.jsx)
- SVG wavy path for connecting steps/elements
- Pencil colored, `stroke-width: 2`

##### [NEW] [client/src/components/sketches/StickyNote.jsx](file:///e:/DEVCONNECT/client/src/components/sketches/StickyNote.jsx)
- Post-it yellow card with curled bottom-right corner effect
- Slightly rotated, hard shadow

---

#### Layout Components

##### [NEW] [client/src/components/layout/Navbar.jsx](file:///e:/DEVCONNECT/client/src/components/layout/Navbar.jsx)
- Paper background with `border-b-2 border-dashed` bottom border
- Logo: "DevConnect" in Kalam with small pencil icon, slight `rotate-(-1deg)`
- Nav links with wavy underline decoration on hover/active
- Icons: Feed (home), Explore (compass), Notifications (bell + unread badge with marker red bg), Profile (user)
- Search input on desktop (wobbly bordered)
- Mobile: hamburger menu with slide-in panel
- Avatar dropdown: Profile, Saved, Logout

##### [NEW] [client/src/components/layout/Sidebar.jsx](file:///e:/DEVCONNECT/client/src/components/layout/Sidebar.jsx)
- Left sidebar: "Trending Tags 📌" in sticky-note card, tags as post-it badges
- Right sidebar: "Who to Follow ✏️" with compact user cards + follow button
- Sticky positioning, `hidden lg:block`
- Dashed border separators

##### [NEW] [client/src/components/layout/PageShell.jsx](file:///e:/DEVCONNECT/client/src/components/layout/PageShell.jsx)
- Responsive: `grid-cols-1 lg:grid-cols-[260px_1fr_260px]`
- Navbar at top, content area with sidebars
- Paper texture background

---

#### Profile Feature

##### [NEW] [client/src/pages/Profile.jsx](file:///e:/DEVCONNECT/client/src/pages/Profile.jsx)
- **Cover image**: Wobbly-bordered frame with `rotate-1`, hard shadow. Gradient fallback (pencil → pen blue diagonal)
- **Avatar**: Overlapping cover by `-mt-12`, `xl` size, pencil border, slight `-rotate-2`
- **Info section**: Name (Kalam, large), @username (Patrick Hand, muted), bio, location/website/github icons
- **Stats row**: 3 organic-shaped containers (posts / followers / following), each with wobbly `circle` radius, slight rotation, number in Kalam bold
- **Skills**: Post-it yellow badges with random rotations
- **Follow/Unfollow button**: Wobbly, red marker fill when following ("Unfollow"), pen blue outline when not ("Follow")
- **Tabs**: Posts | Likes | Media — tab indicator as a red marker underline, slight wobble
- **Post list**: Scrollable feed of user's posts

##### [NEW] [client/src/pages/EditProfile.jsx](file:///e:/DEVCONNECT/client/src/pages/EditProfile.jsx)
- Notebook-page style form
- Avatar upload with circular preview, "Change Photo" button overlaid
- Cover image upload with preview strip
- Fields: name, bio (textarea), location, website, github, skills (tag input)
- Skills tag input: type + Enter → adds post-it badge, click × to remove
- Save button with loading state

##### [NEW] [server/src/controllers/userController.js](file:///e:/DEVCONNECT/server/src/controllers/userController.js)
- `getProfile` — by username, populate follower/following counts
- `updateProfile` — validate, sanitize, update
- `uploadAvatar` — multer + Cloudinary, update user.avatar
- `uploadCover` — multer + Cloudinary, update user.coverImage
- `followUser` — push to arrays + create notification + Socket.IO emit
- `unfollowUser` — pull from arrays
- `getFollowers` / `getFollowing` — paginated, populate user summary
- `getSuggestedUsers` — users not followed, prioritize mutual connections + matching skills

##### [NEW] [server/src/middleware/upload.js](file:///e:/DEVCONNECT/server/src/middleware/upload.js)
- Multer with memory storage (buffer)
- Cloudinary upload function with transformations (avatar: face-crop 200×200; cover: 1200×400 crop)
- File type validation: JPEG, PNG, WebP only, max 5MB

---

### Phase 3: Posts, Feed, Comments & Interactions (~18 files)

#### Post Components

##### [NEW] [client/src/components/feed/PostCard.jsx](file:///e:/DEVCONNECT/client/src/components/feed/PostCard.jsx)
The flagship component. Structure:
- **Card wrapper**: `wobbly-md` border, tape decoration on every 3rd card, `hover:rotate-0.5deg`
- **Header**: Avatar (sm) + author name + @username + relative time. Pencil-line separator below.
- **Content**: Rendered via `react-markdown` with `remark-gfm`. Custom renderers:
  - Code blocks → `react-syntax-highlighter` with a custom paper-toned theme (warm bg, pencil text)
  - Inline code → post-it yellow background
  - Links → pen blue with wavy underline
  - Bold → Kalam font weight
- **Code snippet block** (if present): Language badge (post-it yellow), syntax-highlighted code with "Copy" button (clipboard icon), wobbly border around code block
- **Image**: Wobbly-bordered frame, slight rotation (`-rotate-1`), hard shadow, click to expand
- **Tags**: Clickable post-it badges linking to `/explore?tag=X`
- **Action bar**: Pencil-line separator. Icons with counts:
  - ❤️ Like — heart icon, fills red marker on liked, count. Optimistic toggle.
  - 💬 Comment — message-circle icon, count, links to detail view
  - 🔖 Save — bookmark icon, fills on saved. Optimistic toggle.
  - 📤 Share — share icon, copies link to clipboard + toast
- **Dropdown** (own posts): Edit / Delete with pencil & trash icons
- **Hover**: Card lifts slightly (shadow increases to `shadow-hard-lg`), subtle `rotate-0.5deg`

##### [NEW] [client/src/components/feed/PostForm.jsx](file:///e:/DEVCONNECT/client/src/components/feed/PostForm.jsx)
- Card with thumbtack decoration, "What's on your mind? ✏️" heading in Kalam
- Textarea: wobbly border, auto-resize, Patrick Hand font
- Toolbar below textarea:
  - 🖼️ Image upload (drag-and-drop zone with dashed border, "Drop your sketch here" placeholder)
  - 💻 Code snippet toggle (reveals language selector + code textarea)
  - 🏷️ Tags input
  - Toggle: Preview mode (renders markdown live)
- Image preview: small thumbnail with × remove button, slight rotation
- Code snippet section: language dropdown (styled with wobbly border), code textarea with monospace font override
- Character count: "2,450 / 5,000" in muted text
- Post button: large wobbly button, red marker fill, "Post it! 📝"

##### [NEW] [client/src/components/feed/FeedList.jsx](file:///e:/DEVCONNECT/client/src/components/feed/FeedList.jsx)
- Maps posts → `PostCard` with alternating slight rotations (`-0.5deg`, `0`, `0.5deg`)
- Infinite scroll via `useInfiniteScroll` hook (Intersection Observer)
- Loading: 3 skeleton cards with wobbly borders + pulse
- Empty state: sketched illustration, "Your feed is empty! Follow some devs to see their posts ✏️"
- Error state: red marker message with retry button

##### [NEW] [client/src/pages/Feed.jsx](file:///e:/DEVCONNECT/client/src/pages/Feed.jsx)
- Three-column layout via PageShell
- Left sidebar: Trending tags + navigation
- Center: PostForm at top → FeedList below
- Right sidebar: Suggested users to follow + online friends
- Mobile: single column, sidebars accessible via tabs or bottom nav

##### [NEW] [client/src/pages/PostDetail.jsx](file:///e:/DEVCONNECT/client/src/pages/PostDetail.jsx)
- Full PostCard (expanded, no truncation)
- Dashed separator line (hand-drawn SVG)
- Comment count heading: "3 replies ✏️"
- CommentForm below
- CommentList
- Back button with scribble arrow

---

#### Comment Components

##### [NEW] [client/src/components/comments/CommentList.jsx](file:///e:/DEVCONNECT/client/src/components/comments/CommentList.jsx)
- Each comment: avatar (xs) + name + time + content
- Dashed border-bottom separator between comments
- Like button (small heart) on each comment
- Delete button (trash) for own comments
- Load more button if paginated

##### [NEW] [client/src/components/comments/CommentForm.jsx](file:///e:/DEVCONNECT/client/src/components/comments/CommentForm.jsx)
- Inline: current user's avatar + wobbly input + post button
- Enter to submit, Shift+Enter for newline
- Loading state: button text changes to "Posting..."

---

#### Backend: Posts & Comments

##### [NEW] [server/src/models/Post.js](file:///e:/DEVCONNECT/server/src/models/Post.js)
- Schema with validation (content max 5000, tags max 5 items)
- Pre-save: auto-extract `#hashtags` from content into `tags` array

##### [NEW] [server/src/controllers/postController.js](file:///e:/DEVCONNECT/server/src/controllers/postController.js)
- `getFeed` — `Post.find({ author: { $in: user.following } })`, sorted by `createdAt` desc, cursor-based pagination (last post `_id`), populate author
- `getExplorePosts` — trending algorithm:
  ```javascript
  // score = likes + (comments × 2) + recency_bonus
  // recency_bonus = max(0, 10 - hours_since_posted)
  ```
  Implemented via MongoDB aggregation pipeline with `$addFields` for computed score
- `getUserPosts` — by userId, paginated
- `getPostById` — single post, populate author + comments
- `createPost` — validate, optional image upload, create post
- `updatePost` — ownership check, update content/tags, set `isEdited: true`
- `deletePost` — ownership check, delete post + delete all comments for post
- `toggleLike` — check if user in `likes` array → add or remove, create notification on add
- `toggleSave` — add/remove from user's `savedPosts` array
- `getSavedPosts` — populate user's `savedPosts`

##### [NEW] [server/src/models/Comment.js](file:///e:/DEVCONNECT/server/src/models/Comment.js)

##### [NEW] [server/src/controllers/commentController.js](file:///e:/DEVCONNECT/server/src/controllers/commentController.js)
- `getComments` — by postId, paginated, populate userId
- `addComment` — create + `Post.findByIdAndUpdate({ $inc: { commentsCount: 1 } })` + notification
- `deleteComment` — ownership check + decrement `commentsCount`
- `toggleCommentLike` — like/unlike comment

---

#### Frontend Features (TanStack Query hooks)

##### [NEW] [client/src/features/posts/useFeed.js](file:///e:/DEVCONNECT/client/src/features/posts/useFeed.js)
- `useInfiniteQuery` for feed with cursor-based pagination
- `getNextPageParam` extracts last post ID

##### [NEW] [client/src/features/posts/usePostActions.js](file:///e:/DEVCONNECT/client/src/features/posts/usePostActions.js)
- `useCreatePost` — mutation, invalidates feed on success
- `useUpdatePost` / `useDeletePost`
- `useToggleLike` — **optimistic update**: immediately toggle in cache, rollback on error
- `useToggleSave` — optimistic update

##### [NEW] [client/src/features/comments/useComments.js](file:///e:/DEVCONNECT/client/src/features/comments/useComments.js)
- `useQuery` for comment list
- `useAddComment` — mutation, optimistic insert at top
- `useDeleteComment` — mutation, optimistic remove

---

### Phase 4: Search, Notifications, Polish & Extras (~12 files)

#### Search & Explore

##### [NEW] [client/src/pages/Explore.jsx](file:///e:/DEVCONNECT/client/src/pages/Explore.jsx)
- Search bar: large wobbly input with magnifying glass icon, debounced (300ms)
- Type filter tabs: All | Users | Posts | Tags — styled as notebook tabs with active = red marker underline
- Results layout:
  - Users: grid of user cards (avatar, name, skills preview, follow button), alternating rotations
  - Posts: standard PostCard list
  - Tags: cloud of post-it badges, size weighted by frequency
- Trending section: "What's buzzing? 🐝" — top 10 tags this week

##### [NEW] [client/src/features/search/useSearch.js](file:///e:/DEVCONNECT/client/src/features/search/useSearch.js)
- Debounced query with `useQuery` + `enabled: query.length >= 2`

##### [NEW] [server/src/controllers/searchController.js](file:///e:/DEVCONNECT/server/src/controllers/searchController.js)
- `search` — MongoDB `$text` on users and posts, return combined results with type labels
- `getTrendingTags` — aggregation: `$unwind` tags, `$match` last 7 days, `$group` by tag, `$sort` by count

---

#### Notifications (Real-Time)

##### [NEW] [client/src/pages/Notifications.jsx](file:///e:/DEVCONNECT/client/src/pages/Notifications.jsx)
- List of notification cards (wobbly bordered, slight rotation)
- Unread: postit-yellow background glow, bold text
- Read: white background, normal weight
- Each: sender avatar + message + time + link arrow
- "Mark all as read" button at top (secondary style)
- Types distinguished by icon: ❤️ like, 💬 comment, 👤 follow, @mention

##### [NEW] [server/src/models/Notification.js](file:///e:/DEVCONNECT/server/src/models/Notification.js)

##### [NEW] [server/src/controllers/notificationController.js](file:///e:/DEVCONNECT/server/src/controllers/notificationController.js)
- `getNotifications` — paginated, sorted by createdAt desc
- `markAsRead` / `markAllAsRead`
- `getUnreadCount`

##### [NEW] [server/src/services/notificationService.js](file:///e:/DEVCONNECT/server/src/services/notificationService.js)
- `createNotification({ recipient, sender, type, post?, comment? })` — creates DB record + Socket.IO emit to recipient's room

##### [NEW] [server/src/config/socket.js](file:///e:/DEVCONNECT/server/src/config/socket.js)
- Socket.IO server: CORS config, JWT auth via handshake
- `connection`: join `user_${userId}` room, set `isOnline: true`
- `disconnect`: set `isOnline: false`, update `lastSeen`
- Namespace: default `/`

##### [NEW] [client/src/lib/socket.js](file:///e:/DEVCONNECT/client/src/lib/socket.js)
- Socket.IO client singleton, auto-connect on auth, disconnect on logout

##### [NEW] [client/src/hooks/useSocket.js](file:///e:/DEVCONNECT/client/src/hooks/useSocket.js)
- Listen for `notification` events → update Zustand store + show toast

---

#### Saved Posts

##### [NEW] [client/src/pages/SavedPosts.jsx](file:///e:/DEVCONNECT/client/src/pages/SavedPosts.jsx)
- Grid of bookmarked PostCards
- Empty state: "No saved posts yet! Bookmark posts to find them here 📌"
- Unsave action with optimistic update

---

#### 404 Page

##### [NEW] [client/src/pages/NotFound.jsx](file:///e:/DEVCONNECT/client/src/pages/NotFound.jsx)
- Large "404" in Kalam, hand-drawn style, slight rotation
- "This page got erased! ✏️" message
- Sketched arrow pointing to "Go Home" button
- Decorative doodles

---

#### Router Setup

##### [NEW] [client/src/App.jsx](file:///e:/DEVCONNECT/client/src/App.jsx)
```
/                → Landing (GuestGuard)
/login           → Login (GuestGuard)
/register        → Register (GuestGuard)
/feed            → Feed (AuthGuard)
/explore         → Explore (AuthGuard)
/profile/:username → Profile (AuthGuard)
/profile/edit    → EditProfile (AuthGuard)
/post/:id        → PostDetail (AuthGuard)
/notifications   → Notifications (AuthGuard)
/saved           → SavedPosts (AuthGuard)
*                → NotFound
```
- Lazy loading with `React.lazy` + `Suspense` (skeleton fallback)
- `QueryClientProvider` + `BrowserRouter` at root

---

## Seed Data Script

##### [NEW] [server/scripts/seed.js](file:///e:/DEVCONNECT/server/scripts/seed.js)
A dedicated script to populate the database using `faker`.
- Clears existing data.
- Creates multiple realistic users (e.g. 10 users).
- Creates posts for each user, including text, image, and code snippets.
- Randomly creates comments and likes.
- Establishes follow relationships.
- Runs independently via `node scripts/seed.js`.

---

## Verification Plan

### Automated Tests

```bash
# Backend API tests (Vitest + supertest)
cd server && npm test

# Frontend component tests (Vitest + @testing-library/react)
cd client && npm test
```

**Test scenarios:**
- Auth: register → login → access protected route → logout → cannot access
- Profile: view → edit → upload avatar → verify changes
- Posts: create (text only) → create (with image) → create (with code) → edit → delete
- Feed: follow user → their posts appear → unfollow → posts disappear
- Like: like post → count increments → unlike → count decrements
- Comment: add comment → count updates → delete → count decrements
- Save: save post → appears in saved page → unsave → disappears
- Search: search by username → results appear → search by tag → posts appear

### Manual Verification
- Visual review against the Hand-Drawn design system checklist:
  - ✅ All borders use wobbly radius (no standard `rounded-*`)
  - ✅ All shadows are hard offset (no blur)
  - ✅ All text uses Kalam (headings) or Patrick Hand (body)
  - ✅ Paper dot texture visible on background
  - ✅ Cards have tape/tack decorations
  - ✅ Elements have playful rotations
  - ✅ Buttons press-flat on click
  - ✅ Decorative elements hidden on mobile where specified
- Responsive: 320px → 768px → 1024px → 1440px
- Keyboard navigation and focus states (pen-blue rings)
- Reduced motion: no animations, transitions ≤ 150ms
- Lighthouse: target 90+ performance, 95+ accessibility

### Build Verification
```bash
cd client && npm run build     # Vite production build (no errors)
cd server && node src/app.js   # Server starts and connects to MongoDB
```
