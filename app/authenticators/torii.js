import Base from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';

export default Base.extend({
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
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
});
