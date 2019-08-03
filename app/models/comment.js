import DS from 'ember-data';

export default DS.Model.extend({
    author: DS.attr('string'),
    post_id: DS.attr('string'),
    message: DS.attr('string'),
    created: DS.attr('date')
});
