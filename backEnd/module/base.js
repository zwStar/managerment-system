
import mongoose from 'mongoose'
let db =require("./db.js")
import $ from '../utils'
export default class Base {
    constructor(name, options) {
        const schema = new mongoose.Schema(options, {
            versionKey: false,
            toObject: {virtuals: true},
            toJSON: {virtuals: true},
        });
        this.model = mongoose.model(name, schema);

        schema.virtual('date').get(function (doc) {
            return $.dateformat(this.sendAt);
        });
    }

    static ObjectId() {
        return mongoose.Schema.ObjectId;
    }
}