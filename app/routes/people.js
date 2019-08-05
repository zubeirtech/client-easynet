import Route from '@ember/routing/route';

export default Route.extend({
    afterModel(model) {
        console.log(model)
    }
});
