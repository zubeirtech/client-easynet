import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import { set } from '@ember/object';


export default Route.extend(AuthenticatedRouteMixin, {
    session: service(),
    ajax: service(),
    toast: service(),

    init() {
        this._super(...arguments);
    }, 

    model() {
        return RSVP.hash({
            user: this.store.findAll('person')
        })
    },

    async afterModel(model) {
        const modelArr = model.user.toArray();
        set(model, 'user', modelArr[0]);
        if (!model.user.first_name || !model.user.last_name) {
            this.toast.warning('Please add your name in your profile settings', 'Warning');
            this.transitionTo('my-account');
        }
        const postRes = await this.ajax.request('/all-posts');
        set(model, 'posts', postRes.data);
    },

});
