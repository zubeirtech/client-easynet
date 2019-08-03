import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Controller.extend({
    ajax: service(),
    toast: service(),
    router: service(),

    actions: {
        async addComment(comment, post) {
            try {
                set(this, 'comment', '');
                await this.ajax.request('/comments', {
                    method: 'POST',
                    data: {
                        message: comment,
                        created: new Date(),
                        author: this.model.user.user_name,
                        post_id: post.id
                    }
                });
                this.toast.success('Succesfully added Comment', 'Success')
                document.location.reload();
            } catch (error) {
                console.log(error);
            }
        },
        
        async deleteComment(comment) { 
            try {
                await this.ajax.request('/comments', {
                    method: 'DELETE',
                    data: {
                        id: comment.comment_id,
                    }
                });
                document.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
    }
});
