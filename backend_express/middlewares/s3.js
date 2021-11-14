const S3 = require("aws-sdk/clients/s3")
const fs = require("fs")
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const bucketName = 'uber-eats-cmpe273-lab2';

const s3 = new S3({
  region: 'us-east-2',
  accessKeyId: 'AKIARQTRYMKEREOIJQWH',
  secretAccessKey: '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',
})

// upload a file
const uploadFile = async (file) => {
  const fileStream = fs.createReadStream(file.path)

  // Key -> represents the filename given to the file being uploaded
  // to make file name unique add -> _${Date.now()}
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  // remove file from public folder
  await unlinkFile(file.path)

  return s3.upload(uploadParams).promise()
}

// downloads a file from s3
// function getFileStream(fileKey) {
// const getFileStream = (fileKey) => {
//   const downloadParams = {
//     Key: fileKey,
//     Bucket: bucketName
//   }

//   return s3.getObject(downloadParams).createReadStream()
// }

module.exports = uploadFile;