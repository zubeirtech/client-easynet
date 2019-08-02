import DS from 'ember-data';

export default DS.Model.extend({
    person: DS.belongsTo({ async: false }),
    message: DS.attr('string'),
    created: DS.attr('date')
});
