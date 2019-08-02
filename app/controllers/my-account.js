import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    toastr: service('toast'),

    actions: {
        // async changeImage() {
        //     try {
        //         this.model.user.set('image', this.image);
        //         await this.model.user.save();
        //         document.location.reload();
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },

        async editUser() {
            try {
                await this.model.user.save();
                document.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
    }
});
