import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Controller.extend({
    toastr: service('toast'),
    session: service(),

    checklist(obj) {
        if (obj.user_name !== undefined && obj.first_name !== undefined && obj.last_name !== undefined && obj.password !== undefined) {
            return true
        } 
        this.toastr.error('Please enter all fields', 'Warning');
        return false
    },

    actions: {

        async register() {
            if (this.checklist(this.model)) {
                if (this.model.password === this.secondPassword) {
                    try {
                        set(this, 'secondPassword', "");
                        await this.model.save();
                        let { user_name, password } = this.model;
                        this.get('session').authenticate('authenticator:oauth2', user_name, password).catch((reason) => {
                            this.set('errorMessage', reason.error || reason);
                        });
                    } catch (error) {
                        console.log(error);
                        this.toastr.error('Account exists already', 'Error')
                    }
                } else {
                    this.toastr.warning("Passwords don't match", 'Warning')
                }
            }
        }
    }
});
