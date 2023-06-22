require("dotenv").config();
const fs = require("fs");

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
const AWS_SUFIX_NAME = process.env.AWS_SUFIX_NAME;

const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

const uploadFile = async (file) => {
  try {
    const stream = fs.createReadStream(file.tempFilePath);
    const uploadparams = {
      Bucket: AWS_BUCKET_NAME,
      Key: file.name,
      Body: stream,
    };

    const comand = await new PutObjectCommand(uploadparams);
    const { $metadata } = await client.send(comand);

    if ($metadata.httpStatusCode === 200) {
      const key = `https://${AWS_BUCKET_NAME}.${AWS_SUFIX_NAME}/${file.name}`;
      return { fieldError: false, url: key };
    }
  } catch (error) {
    console.log(error);
    return { fieldError: true, error: "no se pudo subir la imagen" };
  }
};

// const readFile = async (file) => {
//   const command = new GetObjectCommand({
//     Bucket: AWS_BUCKET_NAME,
//     Key: file.name,
//     Body: stream,
//   });

//   return await client.send(comand);
// };

module.exports = { uploadFile };
