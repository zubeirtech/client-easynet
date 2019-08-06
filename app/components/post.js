import Component from '@ember/component';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    ajax: service(),
    activeComment: true,

    actions: {
        async addComment(comment, post) {
            try {
                set(this, 'comment', '');
                const res = await this.ajax.request('https://api-easynet.herokuapp.com/comments', {
                    method: 'POST',
                    data: {
                        message: comment,
                        created: new Date(),
                        author: this.model.user.user_name,
                        post_id: post.id
                    }
                });
                post.attributes.comments.unshiftObject(res.data.attributes);
                this.toast.success('Succesfully added Comment', 'Success')
                //document.location.reload();
            } catch (error) {
                console.log(error);
            }
        },

        async deleteComment(comment, post) {
            try {
                await this.ajax.request('https://api-easynet.herokuapp.com/comments', {
                    method: 'DELETE',
                    data: {
                        id: comment.comment_id,
                    }
                });
                post.attributes.comments.removeObject(comment);
            } catch (error) {
                console.log(error);
            }
        },

        async like(post) {
            try {
                set(this, 'running', true);
                const res = await this.ajax.request('https://api-easynet.herokuapp.com/likes', {
                    method: 'POST',
                    data: {
                        post_id: post.id,
                        user_name: this.model.user.user_name
                    }
                });
                post.attributes.likes.pushObject(res);
                set(post, 'hasliked', true);
                set(this, 'running', false);
            } catch (error) {
                console.log(error);
            }
        },

        async dislike(post) {
            try {
                set(this, 'running', true)
                const likes = post.attributes.likes
                const like = likes.find(like => like.user_name === this.model.user.user_name);
                await this.ajax.request('https://api-easynet.herokuapp.com/likes', {
                    method: 'DELETE',
                    data: {
                        id: like.id
                    }
                })
                post.attributes.likes.removeObject(like);
                set(post, 'hasliked', false);
                set(this, 'running', false)
            } catch (error) {
                console.log(error);
            }
        },
    }
});
