'use strict'
module.exports = function (Schema, opts) {
  const xss = require('xss')

  const AttachmentSchema = new Schema({
    fileName: {
      es_indexed: true,
      type: String
    },
    fileType: {
      es_indexed: true,
      type: String
    },
    fileSize: {
      es_indexed: true,
      type: String
    },
    downloadUrl: {
      es_indexed: true,
      type: String
    },
    thumbnailUrl: {
      es_indexed: true,
      type: String
    },
    imageWidth: Number,
    imageHeight: Number,
    created: {
      es_indexed: true,
      type: Date,
      'default': Date.now
    }
  })
  return new Schema({
    content: {
      es_indexed: true,
      es_analyzer: 'ik',
      type: String,
      'default': null,
      get: function (val) {
        if (val != null) {
          return xss(val)
        } else {
          return val
        }
      }
    },
    note: {
      es_indexed: true,
      es_analyzer: 'ik_smart',
      type: String,
      'default': null,
      get: function (val) {
        if (val != null) {
          return xss(val)
        } else {
          return val
        }
      }
    },
    accomplished: {
      es_indexed: true,
      type: Date,
      'default': null
    },
    dueDate: {
      es_indexed: true,
      type: Date,
      'default': null
    },
    attachments: [AttachmentSchema],
    priority: {
      type: Number,
      'default': 0
    },
    source: {
      type: String,
      'default': 'teambition'
    },
    isDone: {
      es_indexed: true,
      type: Boolean,
      'default': false
    },
    isDeleted: {
      es_indexed: true,
      type: Boolean,
      'default': false
    },
    startOnToday: {
      type: Boolean,
      'default': false
    },
    isArchived: {
      es_indexed: true,
      type: String,
      'default': null
    },
    reminders: Array,
    created: {
      type: Date,
      'default': Date.now,
      get: function (val) {
        if (!val) {
          val = this._id.getTimestamp()
        }
        return val
      },
      es_indexed: true
    },
    updated: {
      es_indexed: true,
      type: Date,
      'default': Date.now
    },
    recurrence: {
      es_indexed: true,
      es_type: 'string',
      type: Schema.Types.Mixed
    },
    _sourceId: {
      type: Schema.Types.ObjectId,
      ref: 'Task'
    },
    sourceDate: Date,
    involveMembers: [
      {
        es_indexed: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    subtaskIds: [
      {
        es_indexed: true,
        type: Schema.Types.ObjectId,
        ref: 'Subtask'
      }
    ],
    visiable: {
      es_indexed: true,
      es_index: 'not_analyzed',
      type: String,
      'default': 'all'
    },
    _creatorId: {
      es_indexed: true,
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    _executorId: {
      es_indexed: true,
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    _tasklistId: {
      type: Schema.Types.ObjectId,
      ref: 'Tasklist'
    },
    _projectId: {
      es_indexed: true,
      type: Schema.Types.ObjectId,
      ref: 'Project'
    },
    _stageId: {
      type: Schema.Types.ObjectId,
      ref: 'Stage',
      'default': null
    },
    tagIds: [
      {
        es_indexed: true,
        type: Schema.Types.ObjectId,
        ref: 'Tag'
      }
    ]
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
