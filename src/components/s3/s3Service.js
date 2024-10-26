import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  region: process.env.REACT_APP_S3_REGION,
  credentials: new AWS.Credentials(
    process.env.REACT_APP_AWS_ACCESS_KEY,
    process.env.REACT_APP_AWS_SECRET_KEY
  ),
});

export const uploadFile = async (file) => {
    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
      Key: file.name,
      Body: file,
      ContentType: file.type,
    };
    try {
      const response = await s3.upload(params).promise();
      return response;
    } catch (error) {
      throw new Error(`Upload error: ${error.message}`);
    }
  };
