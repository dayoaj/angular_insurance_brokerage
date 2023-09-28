import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenResponse, SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { BehaviorSubject, from, lastValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private _currentUser: BehaviorSubject<boolean | User | any> = new BehaviorSubject(false);

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this._currentUser.next(this.supabase.auth.getSession().then(res => res.data.session?.user) ?? false);

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('event: ', event);
      console.log('session: ', session);

      if (session != null) {
        this._currentUser.next(session?.user);
      } else {
        this._currentUser.next(false);
        this.router.navigateByUrl("/", { replaceUrl: true });
      }
    });
  }

  async signIn(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  }

  async signout() {
    return await this.supabase.auth.signOut();
  }

  get currentUser() {

    return this._currentUser.asObservable();
  }

}
