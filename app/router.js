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
});

export default Router;
