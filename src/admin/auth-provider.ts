import { DefaultAuthProvider } from 'adminjs';
import bcrypt from 'bcryptjs';
import componentLoader from './component-loader.js';
import { User } from '../entities/user.entity.js';

const provider = new DefaultAuthProvider({
  componentLoader,
  authenticate: async ({ email, password }) => {
    // 1. Find user by email
    const user = await User.findOneBy({ email });

    // 2. If user exists, check password
    if (user && user.password) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (isPasswordValid) {
        return {
          email: user.email,
          title: user.name || user.email,
          avatarUrl: null, // You can add avatarUrl if available
        };
      }
    }

    // 3. Fail authentication
    return null;
  },
});

export default provider;
