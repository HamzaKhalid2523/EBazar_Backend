const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const ActivityLogsSchema = new Schema({
  ip: { type: String },
  method: { type: String },
  host: { type: String },
  origin: { type: String },
  protocol: { type: String },
  route: { type: String },
  user_agent: { type: String },
  headers: { type: Object },
  category: { type: String },
  action: { type: String },
  action_type: { type: String },
  params: { type: Array },
  created_by: { type: String },
  created_by_role: { type: String },
  status: { type: String, default: 'success' },
  is_deleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

ActivityLogsSchema.plugin(mongoosePaginate);
ActivityLogsSchema.index({ action: "text" });
ActivityLogsSchema.index({ "$**": "text" });

module.exports = mongoose.model("ActivityLogs", ActivityLogsSchema);
