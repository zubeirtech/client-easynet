import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
    ajax: service(),

    model() {
        return RSVP.hash({
            user: this.store.findAll('person')
        })
    },
    async afterModel(model) {
        const modelArr = model.user.toArray();
        set(model, 'user', modelArr[0]);
        const resPosts = await this.ajax.request(`/posts?user_name=${model.user.user_name}`);
        set(model, 'posts', resPosts.data);
        const resFriends = await this.ajax.request(`/people-by-user?user_name=${model.user.user_name}`);
        set(model, 'friends', resFriends.data);
    }
});
