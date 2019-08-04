import DS from 'ember-data';

export default DS.Model.extend({
    user_name: DS.attr('string'),
    first_name: DS.attr('string'),
    last_name: DS.attr('string'),
    biography: DS.attr('string'),
    age: DS.attr('number', { defaultValue: 0 }),
    status: DS.attr('string'),
    password: DS.attr('string'),
    image: DS.attr('string'),
    posts: DS.attr(),
    friends: DS.attr(),
    isFriend: DS.attr()
});