import { Company, Review } from "./Schema.js";
import mongoose from "mongoose";

export const newCompany = async (req, res) => {
  try {
    const { name, location, city, foundedOn } = req.body;

    if (!name || !location || !city || !foundedOn) {
      return res.status(400).json({
        success: false,
        message: "All fields are Required",
      });
    }

    const existingCompany = await Company.findOne({
      name: name.trim(),
      //   city: city.trim(),
    });

    if (existingCompany) {
      return res.status(409).json({
        success: false,
        message: "Company already exists in this city According to name",
      });
    }

    const company = await Company.create({
      name: name.trim(),
      location: location.trim(),
      city: city.trim(),
      foundedOn: foundedOn?.trim() || "N/A",
      reviews: [],
    });

    return res.status(201).json({
      success: true,
      message: "Company added successfully",
      company,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getAllCompany = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const city = req.query.city || "";
    const sortby = req.query.sort || "Name";

    let filter = {};
    if (city) {
      filter.city = { $regex: city, $options: "i" };
    }

    let companies = await Company.find(filter).populate("reviews");

    if (sortby === "Name") {
      companies.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortby === "Rating") {
      companies.sort((a, b) => {
        const avgOfA =
          a.reviews.reduce((s, r) => s + r.rating, 0) / (a.reviews.length || 1);

        const avgOfB =
          b.reviews.reduce((s, r) => s + r.rating, 0) / (b.reviews.length || 1);

        return avgOfB - avgOfA;
      });
    }

    const totalComp = companies.length;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedCompanies = companies.slice(startIndex, endIndex);

    return res.status(200).json({
      companies: paginatedCompanies,
      totalPages: Math.ceil(totalComp / limit),
      currentPage: page,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const addReview = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { userName, rating, comment, subject } = req.body;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company id",
      });
    }

    if (!userName || !rating || !comment || !subject) {
      return res.status(400).json({
        success: false,
        message: "userName, rating and comment are required",
      });
    }

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    const review = await Review.create({
      companyId,
      userName,
      rating,
      comment,
      subject,
    });

    company.reviews.push(review._id);
    await company.save();

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add review",
      error: error.message,
    });
  }
};

export const getCompanyDEtials = async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company id",
      });
    }

    const company = await Company.findById(companyId).populate({
      path: "reviews",
      options: { sort: { createdAt: -1 } },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch company details",
      error: error.message,
    });
  }
};
