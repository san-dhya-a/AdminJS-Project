import { BaseAuthProvider, LoginHandlerOptions, RefreshTokenHandlerOptions } from 'adminjs';
import { UserService } from '../user.service.js';

export class UserAuthProvider extends BaseAuthProvider {
  constructor(private readonly userService: UserService) {
    super();
  }

  public override async handleLogin(opts: LoginHandlerOptions, context?: any) {
    const { data = {} } = opts;
    const { email, password } = data;

    return this.userService.authenticate(email, password);
  }

  public override async handleLogout(context?: any): Promise<any> {
    return Promise.resolve();
  }

  public override async handleRefreshToken(opts: RefreshTokenHandlerOptions, context?: any): Promise<any> {
    // opts.data, opts.query, opts.params, opts.headers can help retrieve session info or tokens
    // but in a basic session setup (using cookies), current AdminJS session usually handles it
    // if you have a JWT token, you would verify and refresh it here
    
    // In our case we simply refresh user info or return what's expected for session extensions.
    // context.session contains the user session if enabled via setup
    // let's assume the session has the email stored if they are logged in:
    const sessionAdmin = context?.session?.adminUser || (context?.request?.session && context.request.session.adminUser);

    if (sessionAdmin && sessionAdmin.email) {
      const refreshedAdmin = await this.userService.validateAndRefreshUser(sessionAdmin.email);
      if (refreshedAdmin) {
         // this acts as extending the session data
         return refreshedAdmin;
      }
    }
    
    return Promise.resolve({});
  }
}
