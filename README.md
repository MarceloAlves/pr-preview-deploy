# Serverless PR Preview Deploy

Uses CloudFront + Lambda@Edge to route subdomains to a folder inside a bucket.

## Setup

#### Prerequisites

- A domain name

<!-- - Domain with a hosted zone in [Route 53](https://aws.amazon.com/route53/) -->
<!-- - Free public certificate in the US-EAST-1 region using [Certificate Manager](https://aws.amazon.com/certificate-manager/) -->
<!-- - Base bucket created in [S3](https://aws.amazon.com/s3/) -->

### Setup

1. Add the domain to [Route 53](https://aws.amazon.com/route53/)
2. Start the creation of a public certification using [Certificate Manager](https://aws.amazon.com/certificate-manager/) in the `US-EAST-1` region. Use the wildcard version as the domain name (`*.example.com`) and the full domain as an additional name (`example.com`). For domain verification, allow Certificate Manager to set up Route 53.
3. Update the following files:
   - `serverless.yml`
     - Line 3: Set the name of the S3 bucket
     - Lines 63 & 64: Update the aliases to the regular domain and wildcard domain (ex: `example.com` & `*.example.com`)
     - Line 66: Update the value to the resource name of the certificate created in step 2
   - `handler.js`
     - Line 3: Update value to the domain name with prefix of `.` (ex: `.example.com`)
     - Line 5: Update the value to the name of the S3 bucket that was set in `serverless.yml:3`
4. Run `serverless deploy`, cross your fingers and grab a beer cause it'll take a while to run.
5. Update Route 53 to point to the CloudFront distribution

### Usage

Using the S3 cli, copy files to a folder in the bucket name you picked in step 3. To view the deployed site, visit `https://{site-bucket-name}.{domain}.com`

### Credits

Adpated from this [SO answer](https://stackoverflow.com/questions/49812706/serving-a-multitude-of-static-sites-from-a-wildcard-domain-in-aws/49817210#49817210) with updates for SPA routing and Serverless deploy
