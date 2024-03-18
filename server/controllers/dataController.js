const Data = require("../models/dataModel");
const catchAsync = require("./../utils/catchAsync");

exports.fetchData = catchAsync(async (req, res) => {
  try {
    console.log("Fetching data...");
    // const dataFetched = await Data.find().limit(10);
    const dataFetched = await Data.find();

    console.log("Data fetched:", dataFetched);
    res.json({
      status: "ok",
      data: {
        dataFetched,
      },
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error.");
  }
});

exports.createData = catchAsync(async (req, res, next) => {
  const newData = await Data.create({
    end_year: req.body.end_year,
    intensity: req.body.intensity,
    sector: req.body.sector,
    topic: req.body.topic,
    insight: req.body.insight,
    url: req.body.url,
    region: req.body.region,
    start_year: req.body.start_year,
    impact: req.body.impact,
    added: req.body.added,
    published: req.body.published,
    country: req.body.country,
    relevance: req.body.relevance,
    pestle: req.body.pestle,
    source: req.body.source,
    title: req.body.title,
    likelihood: req.body.likelihood,
  });

  res.status(201).json({
    success: true,
    data: newData,
  });
});

exports.filterByEndYear = catchAsync(async (req, res) => {
  try {
    const endYear = req.query.endYear;
    const filteredData = await Data.find({ end_year: endYear });
    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.filterByTopics = catchAsync(async (req, res) => {
  try {
    const topics = req.query.topics;
    const filteredData = await Data.find({ topic: { $in: topics } });
    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.filterBySector = catchAsync(async (req, res) => {
  try {
    const sector = req.query.sector;
    const filteredData = await Data.find({ sector: sector });
    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add more API functions here following the same structure

// Example:
exports.filterByRegion = catchAsync(async (req, res) => {
  try {
    const region = req.query.region;
    const filteredData = await Data.find({ region: region });
    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
