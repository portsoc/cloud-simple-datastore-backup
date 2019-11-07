const { GoogleAuth } = require('google-auth-library');

// fill in your bucket name here:
const BUCKET_NAME = 'gs://YOUR-BUCKET-NAME';

async function main () {
  try {
    const auth = new GoogleAuth({
      scopes: 'https://www.googleapis.com/auth/cloud-platform'
    });
    const client = await auth.getClient();
    const projectId = await auth.getProjectId();
    console.log(`Project ID is ${projectId}`);

    const res = await client.request({
      method: 'POST',
      url: `https://datastore.googleapis.com/v1/projects/${projectId}:export`,
      data: {
        outputUrlPrefix: BUCKET_NAME
      }
    });
    console.error('RESPONSE:');
    console.log(res.data);
  } catch (error) {
    console.error('ERROR');
    console.error(error);
  }
}

main();
