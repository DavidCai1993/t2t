'use strict'
module.exports = function (Schema) {
  const xss = require('xss')

  return new Schema({
    title: {
      type: String,
      get: function (val) {
        if (val != null) {
          return xss(val)
        } else {
          return val
        }
      }
    },
    description: {
      type: String,
      'default': '',
      get: function (val) {
        if (val != null) {
          return xss(val)
        } else {
          return val
        }
      }
    },
    isArchived: {
      type: String,
      'default': null
    },
    isDeleted: {
      type: Boolean,
      'default': false
    },
    created: {
      type: Date,
      'default': Date.now
    },
    updated: {
      type: Date,
      'default': Date.now
    },
    _creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    _projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    },
    stageIds: Array,
    lock: String
  }, {
    read: 'secondaryPreferred',
    toObject: {
      virtuals: true,
      getters: true
    },
    toJSON: {
      virtuals: true,
      getters: true
    }
  })
}
