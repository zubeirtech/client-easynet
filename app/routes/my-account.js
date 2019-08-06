import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
    ajax: service(),
    session: service(),

    model() {
        return RSVP.hash({
            user: this.store.findAll('person')
        })
    },

    getAccessToken(session) {
        if (session.data.authenticated.authenticator === 'authenticator:oauth2') {
            return session.data.authenticated.access_token
        }
        return session.data.access_token;
    },

    async afterModel(model) {
        const modelArr = model.user.toArray();
        set(model, 'user', modelArr[0]);
        const resPosts = await this.ajax.request(`https://api-easynet.herokuapp.com/posts?access_token=${this.getAccessToken(this.session)}`);
        set(model, 'posts', resPosts.data);
        const resFriends = await this.ajax.request(`https://api-easynet.herokuapp.com/people-by-user?access_token=${this.getAccessToken(this.session)}`);
        set(model, 'friends', resFriends.data);
    }
});
