import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';
import { set } from '@ember/object';

export default Route.extend(AuthenticatedRouteMixin, {

    model() {
        return RSVP.hash({
            user: this.store.findAll('person')
        })
    },
    afterModel(model) {
        const modelArr = model.user.toArray();
        set(model, 'user', modelArr[0]);
    }
});
