import mongoose, { Schema, Document } from "mongoose";

export interface Weather extends Document {
  updatedAt: Date;
  createdAt: Date;
}

const weatherSchema: Schema = new Schema(
  {
    coord: {
      type: {
        lat: Number,
        lon: Number,
      },
    },
    weather: {
      type: [{ type: Object }],
    },
    base: {
      type: String,
    },
    main: {
      type: Object,
    },
    visibility: {
      type: Number,
    },
    wind: {
      type: Object,
    },
    rain: {
      type: Object,
    },
    clouds: {
      type: Object,
    },
    dt: {
      type: Number,
    },
    timezone: {
      type: Number,
    },
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
    cod: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Weather>("weather", weatherSchema);
