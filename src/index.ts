import AWS from "aws-sdk";
import {
  dynamodbCreateTable,
  dynamodbDescribeTable,
  dynamodbDeleteTable,
  dynamodbCreateRecord,
} from "./aws";
import vendors from "./data/vendors";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const init = async () => {
  const vendorsTableName: string = "vendors";

  const vendorsTable = await dynamodbDescribeTable(vendorsTableName);

  if (!(vendorsTable instanceof Error)) {
    // DELETE THE TABLE
    await dynamodbDeleteTable(vendorsTableName);
    await delay(6000);
  }

  const vendorsTableParams: AWS.DynamoDB.CreateTableInput = {
    TableName: vendorsTableName,
    KeySchema: [
      {
        AttributeName: "twitterId",
        KeyType: "HASH",
      },
    ],
    AttributeDefinitions: [
      {
        AttributeName: "twitterId",
        AttributeType: "S",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };

  dynamodbCreateTable(vendorsTableParams);
  await delay(6000);

  for (const i in vendors) {
    const res = await dynamodbCreateRecord(vendorsTableName, vendors[i]);
    if (res instanceof Error) {
      console.log("Error: ", vendors[i], res);
    }
  }
};

init();
