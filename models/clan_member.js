var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var PORT = 3000;

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// Define memberSchema
const memberSchema = new Schema({

  // Requiring the clan_member.js that resides in ./models.
  var Member = require("./models");

  tag: { type: String, unique: true },
  name: { type: String, unique: false },
  role: { type: String, unique: false },
  expLevel: { type: String, unique: false },
  // league.id
  // league.name
  trophies: { type: String, unique: false },
  versusTrophies: { type: String, unique: false },
  clanRank: { type: String, unique: false },
  previousClanRank: { type: String, unique: false },
  donations: { type: String, unique: false },
  donationsReceived: { type: String, unique: false }
});

// Define schema methods
// memberSchema.methods = {

// Define hooks for pre-saving
// memberSchema.pre('save', function(next) {
//   if (!this.local.password) {
//     console.log('=======NO PASSWORD PROVIDED=======')
//     next()
//   } else {
//     this.local.password = this.hashPassword(this.local.password)
//     next()
//   }
// })

// Create reference to member & export
const member = mongoose.model("member", memberSchema);
module.exports = member;
