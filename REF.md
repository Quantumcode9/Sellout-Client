
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)




const tvSchema = new mongoose.Schema({
  modelNumber: { type: String, required: true },
  size: Number,
  image: String,
  image2: String,
  image3: String,
  brightness: Number,
  name: String,
  sku: String,
  overallRating: { type: Number, min: 1, max: 10 },
  overview: String,
  wideColorGamut: { type: Boolean, default: false },
  buildQuality: { type: String, enum: ['poor', 'fair', 'good', 'excellent'] },
  antiGlare: { type: Boolean, default: false },
  vrr: { type: Boolean, default: false },
  contrastRatio: String,
  backlightType: { type: String, enum: ['Full Array', 'Edge Lit', 'Direct Lit', 'Mini-LED', 'Pixel' ] },
  dimensions: {
    width: Number,
    height: Number,
  },
  type: { type: String, enum: ['OLED', 'Mini LED', 'QLED', 'LED'], default: 'LED' },
  refreshRate: { type: Number, enum: [120, 60] },
  highDynamicRangeFormat: { type: String, enum: ['Dolby Vision', 'HDR 10+', 'HDR 10', 'null'] },
  brand: { type: String, enum: ['Samsung', 'LG', 'Sony', 'TCL', 'Roku', 'Hisense', 'other'] },
  smartOS: { type: String, enum: ['Roku', 'Android', 'webOS', 'Tizen', 'Vidaa U', 'Fire TV', 'Google', 'other'] },
  price: Number,
  modelYear: Number,
  features: [String],
  inputs: [String],
  reviews: [reviewSchema],
  soundbars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Soundbar'
}],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
},
);

module.exports = mongoose.model('TV', tvSchema);

