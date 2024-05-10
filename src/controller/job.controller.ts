import { NextFunction, Request, Response } from "express";
// ===================================================
import {
  checkIdIsAvailable,
  getJobById,
  getJobs,
} from "../services/job.service";
import { ObjectId } from "mongodb";

// Middleware GET handler for Checking ID is valid or invalid
export async function checkJobId(
  req: Request,
  res: Response,
  next: NextFunction,
  val: ObjectId
) {
  const validId = await checkIdIsAvailable(val);

  if (!validId)
    return res.status(400).json({
      status: "fail",
      message: "Invalid Id",
    });

  next();
}

// GET request handler for job list and sort/filter list
export async function getJobList(req: Request, res: Response) {
  const {
    sortBy,
    minPackage,
    maxPackage,
    minExperience,
    maxExperience,
    ...query
  } = req.query;

  let sort = sortBy == "asc" ? -1 : 1;
  let salaryRange = {};
  let experience = {};
  let newQueryObj: any = {};

  if (query) {
    const queryKey = Object.keys(query);
    queryKey.forEach((res) => {
      if (!isNaN(Number(query[res]))) {
        newQueryObj[res] = Number(query[res]);
      } else {
        newQueryObj[res] = query[res];
      }
    });
  }

  console.log(newQueryObj);

  if (minExperience && maxExperience) {
    experience = {
      minExperience: +minExperience,
      maxExperience: +maxExperience,
    };
  }

  if (minPackage && maxPackage) {
    salaryRange = {
      maxPackage: +maxPackage,
      minPackage: +minPackage,
    };
  }

  try {
    const jobList = await getJobs(newQueryObj, sort, salaryRange, experience);
    if (!jobList)
      return res.status(200).json({
        status: "success",
        message: "No content",
      });

    res.status(200).json({
      status: "success",
      results: jobList.length,
      data: jobList,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
}

// GET request handler for get job by ID
export async function getJob(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const job = await getJobById(new ObjectId(id));

    res.status(200).json({
      status: "success",
      data: {
        job,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
}
