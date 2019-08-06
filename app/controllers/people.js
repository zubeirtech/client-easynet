import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    ajax: service(),
    toast: service(),
    session: service(),

    getAccessToken(session) {
        if (session.data.authenticated.authenticator === 'authenticator:oauth2') {
            return session.data.authenticated.access_token
        }
        return session.data.access_token;
    },

    actions: {

        async follow() {
            
            await this.ajax.request('https://api-easynet.herokuapp.com/friends', {
                method: 'POST',
                data: {
                    friend: this.model.user_name,
                    accessToken: this.getAccessToken(this.session)
                }
            })
            this.toast.success('Successfully added to friendslist', 'Nice');
            document.location.reload();
        }

    }
});
