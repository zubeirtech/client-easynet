import DS from 'ember-data';

export default DS.Model.extend({
    person: DS.belongsTo({ async: false }),
    friend: DS.belongsTo({ async: false })
});
