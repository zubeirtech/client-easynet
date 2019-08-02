import DS from 'ember-data';

export default DS.Model.extend({
    post: DS.belongsTo({ async: false }),
    person: DS.belongsTo({ async: false }),
});
