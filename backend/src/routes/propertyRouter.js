
import express from "express";
import {
    getProperties,
    getProperty
} from "../controller/propertyController.js";

const propertyRouter = express.Router();

// Get all properties
propertyRouter.route("/").get(getProperties);

// Get a single property by ID
propertyRouter.route("/:id").get(getProperty);

export { propertyRouter };
