import AWS from "aws-sdk";
import { marshall } from "@aws-sdk/util-dynamodb";

import { AWSRegions } from "./types/aws";
import { Vendor } from "./types/twitter";

AWS.config.update({ region: AWSRegions.AP_NORTHEAST_2 });

const { DynamoDB } = AWS;
const dynamodb = new DynamoDB();

// CREATE TABLE
export const dynamodbCreateTable = async (
  params: AWS.DynamoDB.CreateTableInput
) => {
  try {
    const result = await dynamodb.createTable(params).promise();
    console.log("Table created: ", result);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("dynamodbCreateTable error object unknown type");
  }
};

// DESCRIBE TABLE
export const dynamodbDescribeTable = async (tableName: string) => {
  try {
    const table = await dynamodb
      .describeTable({
        TableName: tableName,
      })
      .promise();
    console.log("Table retrieved: ", table);
    return table;
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }
    throw new Error("dynamodbDescribeTable error object unknown type");
  }
};

// DELETE TABLE
export const dynamodbDeleteTable = async (tableName: string) => {
  try {
    const result = await dynamodb
      .deleteTable({
        TableName: tableName,
      })
      .promise();
    console.log("Table deleted: ", result);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("dynamodbDeleteTable error object unknown type");
  }
};

// CREATE RECORD
export const dynamodbCreateRecord = async (
  tableName: string,
  vendor: Vendor
) => {
  try {
    await dynamodb
      .putItem({
        TableName: tableName,
        Item: marshall(vendor),
      })
      .promise();
    console.log("Record created");
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }
    throw new Error("dynamodbCreateRecord error object unknown type");
  }
};
