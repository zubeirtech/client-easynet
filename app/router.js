import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('feed');
  this.route('sign-up');
  this.route('privacy-policy');
  this.route('my-account');
  this.route('about');
  this.route('user');
  this.route('people', { path: 'people/:person_id' });
  this.route('posts', function() {
    this.route('info', { path: ':post_id' }, function() {
      this.route('likes');
    });
  });
});

export default Router;
