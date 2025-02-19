# Users & Posts Dashboard

A modern, responsive Next.js web application that displays user profiles and their associated posts, built with Redux Toolkit for state management and shadcn/ui for the user interface.

## Demo

- Live Demo: [User Feed Sync](https://user-feed-sync.vercel.app/)
- GitHub Repository: [UserPosts](https://github.com/Durgaprasd25d/UserPosts.git)
- Demo Image: ![Dashboard Screenshot](https://github.com/Durgaprasd25d/my-bio/blob/main/Screenshot%202025-02-05%20153545.png)

## Features

- Fetch and display user profiles from JSONPlaceholder API
- View posts associated with each user
- Search users by name or email
- Sort users by name or company
- Responsive design for desktop, tablet, and mobile devices
- Modern UI with smooth transitions and loading states
- Efficient state management with Redux Toolkit
- Error handling for failed API requests

## Tech Stack

- Next.js 13
- Redux Toolkit
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React Icons

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Durgaprasd25d/UserPosts.git
   ```
2. Navigate to the project directory:
   ```bash
   cd UserPosts
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - Reusable React components
- `/lib` - Utility functions, hooks, and Redux store
- `/public` - Static assets

## API Integration

The application integrates with JSONPlaceholder API:
- Users API: [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)
- Posts API: [https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts)

## State Management

Redux Toolkit is used for state management with the following slices:
- `usersSlice` - Manages user data, search, and sorting
- `postsSlice` - Manages posts data for selected users

## Testing

To run tests:
```bash
npm run test
```

## Building for Production

To create a production build:
```bash
npm run build
```

## License

MIT

