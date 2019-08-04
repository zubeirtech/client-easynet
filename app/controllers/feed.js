import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Controller.extend({
    ajax: service(),
    toast: service(),
    router: service(),

    getObjectPropertyList(arr) {
        let list = []
        arr.forEach(element => {
            const { prop } = element
            list.pushObject(prop);
        });
        return list;
    },

    setup(model) {
        const posts = model.posts;
        posts.forEach(post => {
            const likes = post.attributes.likes;
            likes.forEach(like => {
                if (like.user_name === this.model.user.user_name) {
                    set(post, 'hasliked', true);
                }
            });
        });
    },

    actions: {
        async addComment(comment, post) {
            try {
                set(this, 'comment', '');
                const res = await this.ajax.request('/comments', {
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
                await this.ajax.request('/comments', {
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
                const res = await this.ajax.request('/likes', {
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
                console.log(like);
                await this.ajax.request('/likes', {
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

        async addPost() {
            try {
                set(this, 'disabled', true);

                await this.ajax.request('/posts', {
                    method: 'POST',
                    data: {
                        message: this.message,
                        author: this.model.user.user_name,
                    }
                });
                window.location.href = '';
                set(this, 'disabled', false);
            } catch (error) {
                console.log(error);
            }
        }
    }
});
