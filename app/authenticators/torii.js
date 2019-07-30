import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default ToriiAuthenticator.extend({
    torii: service(),
    session: service(),
    ajax: service(),

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
            
        } catch (error) {
            console.log(error);
        }
    }
});
