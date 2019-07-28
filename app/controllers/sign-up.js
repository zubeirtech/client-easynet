import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    toastr: service('toast'),

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
                        await this.model.save();   
                    } catch (error) {
                        if (error) {
                            this.toastr.error('Account exists already', 'Error')
                        }
                    }
                } else {
                    this.toastr.warning("Passwords don't match", 'Warning')
                }
            }
        }
    }
});
