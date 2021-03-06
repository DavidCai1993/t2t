'use strict'
const MEMBER_NAMES = ['guest', 'member', 'admin', 'owner']

module.exports = function (Schema) {
  return new Schema({
    _userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    _teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team'
    },
    _boundToObjectId: Schema.Types.ObjectId,
    boundToObjectType: String,
    invited: Date,
    joined: {
      type: Date,
      'default': Date.now
    },
    isQuited: {
      type: Boolean,
      'default': false
    },
    visited: Date,
    quited: Date,
    role: {
      type: Number,
      'default': 0
    },
    _roleId: {
      type: Schema.Types.ObjectId,
      ref: 'Role'
    },
    pushStatus: {
      type: Boolean
    },
    unreadCount: {
      type: Number,
      'default': 0
    },
    unreadMessageCount: {
      type: Number,
      'default': 0
    }
  }, {
    read: 'secondaryPreferred'
  })
}
