const { Model } = require('sequelize');

class MyModel extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        disputeId: DataTypes.UUID,
        type: DataTypes.ENUM(...['my', 'enum', 'options']),
        message: DataTypes.TEXT,
        updateCreatorId: DataTypes.STRING,
        reply: DataTypes.TEXT
      },
      {
        sequelize,
        hooks: {
          afterCreate: this.afterCreate
        }
      }
    );
  }

  static afterCreate() {
    // do nothing
  }

  static getSomethingWithNestedStuff(match, db) {
    return this.findOne({
      where: { someField: match },
      attributes: [
        'id',
        'createdAt',
        'reason'
      ],
      order: [[db.Association, db.OtherAssociation, 'createdAt', 'ASC']],
      include: [
        {
          model: db.Association,
          attributes: ['id'],
          include: [
            {
              model: db.OtherAssociation,
              attributes: [
                'id',
                'type',
                'createdAt'
              ],
              include: [
                {
                  model: db.SecondNestedAssociation,
                  attributes: ['fullUrl', 'previewUrl']
                }
              ]
            }
          ]
        }
      ]
    });
  }
}

module.exports = MyModel;
