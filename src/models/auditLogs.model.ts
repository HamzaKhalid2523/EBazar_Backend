import mongoosePaginate from "mongoose-paginate";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuditLogs = new Schema({
  created_by: { type: String },
  created_by_role: { type: String },
  ip: { type: String },
  method: { type: String },
  host: { type: String },
  origin: { type: String },
  protocol: { type: String },
  route: { type: String },
  headers: { type: Object },
  status: { type: String, default: 'success' },
  category: { type: String },
  action: { type: String },
  action_type: { type: String },
  params: { type: Array },
  user_agent: { type: String },
  is_deleted: { type: Boolean, default: false }
},
{
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
});

AuditLogs.plugin(mongoosePaginate);
AuditLogs.index({ description: "text" });
AuditLogs.index({ "$**": "text" });

module.exports = mongoose.model("AuditLogs", AuditLogs);
