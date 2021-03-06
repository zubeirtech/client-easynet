import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { inject as service } from '@ember/service';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
    host: 'https://api-easynet.herokuapp.com',
    session: service('session'),

    authorize(xhr) {
        if (this.session.data.authenticated.authenticator === 'authenticator:torii') {
            let { access_token } = this.session.data;
            xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
        } else {
            let { access_token } = this.get('session.data.authenticated');
            xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
        }
    },
});
