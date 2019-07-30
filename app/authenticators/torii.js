import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
import { inject as service } from '@ember/service';
import { set, computed } from '@ember/object';

export default ToriiAuthenticator.extend({
    torii: service(),
    session: service(),
    ajax: service(),
    serverTokenEndpoint: 'http://localhost:5000/auth-google',
    access_token: computed('this.session', function () {
        return this.session.access_token;
    }),

    async restore(data) {
    },

    async authenticate(provider, options) {
        try {
            const authResponse = await this.torii.open(provider, options);
            const res = await this.get('ajax').request('/auth-google', {
                method: 'POST',
                data: {
                    code: authResponse.authorizationCode,
                    redirect_uri: authResponse.redirectUri
                },
            });
            const { access_token } = res;
            set(this.session.data.authenticated, 'access_token', access_token);
            return access_token;
        } catch (error) {
            document.location.reload();
            console.log(error);
        }
    },

    async invalidate(data) {

    }

});
