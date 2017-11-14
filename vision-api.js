
// Imports the Google Cloud client library.
const Storage = require('@google-cloud/storage');

// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.
const storage = Storage();

const bucketName = 'artifacts-image';//'Bucket where the file resides, e.g. my-bucket';
const fileName = 'houston-home-insurance-claims.jpg';//'Path to file within bucket, e.g. path/to/image.png';

/*
// Makes an authenticated API request.
storage
  .getBuckets()
  .then((results) => {
    const buckets = results[0];
    console.log('Buckets:');
    buckets.forEach((bucket) => {
		
		
      console.log(bucket.name);
    });
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });

*/

// Imports the Google Cloud client library
//const Vision = require('@google-cloud/vision');

var gcloud = require('google-cloud');

// Creates a client
const vision = gcloud.vision();
// The name of the image file to annotate
//const fileName = './resources/demo-image.jpg';
//const fileName = './resources/5-4x6-1copy copy.jpg';

// Prepare the request object
const request = {
  source: {
    imageUri: `gs://${bucketName}/${fileName}`
	//filename: fileName
  }
};
/*
 // Performs landmark detection on the local file
  vision.landmarkDetection(request)
    .then((results) => {
      const landmarks = results[0].landmarkAnnotations;
      console.log('Landmarks:');
      landmarks.forEach((landmark) => console.log(landmark));
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
  // [END vision_landmark_detection]

// Performs label detection on the image file
vision.labelDetection(request)
  .then((results) => {
    const labels = results[0].labelAnnotations;
    console.log('Labels:');
    labels.forEach((label) => console.log(label.description));
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
 */ 
vision.webDetection(request)
	.then((results) => {
		const webDetection = results[0].webDetection;

		if (webDetection.fullMatchingImages.length) {
			console.log(`Full matches found: ${webDetection.fullMatchingImages.length}`);
			webDetection.fullMatchingImages.forEach((image) => {
			console.log(`  URL: ${image.url}`);
			console.log(`  Score: ${image.score}`);
        });
			
			
        /*webDetection.fullMatchingImages.forEach((image) => {
          console.log(`  URL: ${image.url}`);
          console.log(`  Score: ${image.score}`);
        });*/
      }
	  
	  if (webDetection.partialMatchingImages.length) {
        console.log(`Partial matches found: ${webDetection.partialMatchingImages.length}`);
        webDetection.partialMatchingImages.forEach((image) => {
          console.log(`  URL: ${image.url}`);
          console.log(`  Score: ${image.score}`);
        });
      }
	/*
      if (webDetection.partialMatchingImages.length) {
			console.log(`Partial matches found: ${webDetection.partialMatchingImages.length}`);
        /*webDetection.partialMatchingImages.forEach((image) => {
          console.log(`  URL: ${image.url}`);
          console.log(`  Score: ${image.score}`);
        });
      }
	  

      if (webDetection.webEntities.length) {
		console.log(`Web entities found: ${webDetection.webEntities.length}`);
        /*webDetection.webEntities.forEach((webEntity) => {
          console.log(`  Description: ${webEntity.description}`);
          console.log(`  Score: ${webEntity.score}`);
        });
      }*/
	  if(webDetection.fullMatchingImages.length > 0 && webDetection.partialMatchingImages.length > 0)
	  console.log('duplicate image');
	}).catch((err2) =>{
		console.error('ERROR2:', err2);
	});
	
	 
	