'use strict';

const remove_suffix = '.example.com'; // TODO: Update domain name

const origin_hostname = 'example-bucket'; // TODO: Update bucket name

module.exports.cloudfront = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;
  const host_header = headers.host[0].value;

  if (host_header.endsWith(remove_suffix)) {
    let newUri = request.uri;

    // If request.uri is a url path
    if (!request.uri.match(/\..*$/)) {
      // Return index.html so that react can route correctly
      newUri = '/' + host_header.substring(0, host_header.length - remove_suffix.length) + '/index.html';
    } else {
      // prepend '/' + the subdomain onto the existing request path ("uri")
      newUri = '/' + host_header.substring(0, host_header.length - remove_suffix.length) + request.uri;
    }

    request.uri = newUri;
  }

  // fix the host header so that S3 understands the request
  headers.host[0].value = origin_hostname;

  // return control to CloudFront with the modified request
  return callback(null, request);
};
