<<<<<<< HEAD
import { Collection, Db } from "mongodb";
import client from "../server/mongo.server";
import { IJobApplication } from "../models/jobApplication.model";

const db: Db = client.db("JobBoard");
const applications: Collection = db.collection("job-applications");

export async function insertJobApplicationIntoDatabase(
  jobApplication: IJobApplication
) {
  const application = await applications.insertOne(jobApplication);
  return application;
}
=======
import { Collection, Db } from "mongodb";
import client from "../server/mongo.server";
import { IJobApplication } from "../models/jobApplication.model";

const db: Db = client.db("JobBoard");
const applications: Collection = db.collection("job-applications");

export async function insertJobApplicationIntoDatabase(
  jobApplication: IJobApplication
) {
  const application = await applications.insertOne(jobApplication);
  return application;
}
>>>>>>> fc9bf1dcf1ba50a4ce2b361fbab7618ea7fd2e30
