import boto3
from botocore import UNSIGNED
from botocore.config import Config

AWS_DEFAULT_REGION = "ap-south-1"
BUCKET_NAME = 'testbucketfp'
# s3://oguploadmaster/portalUploads/ahm2021/aainphotos/

def getAWSImages():
    imageURLs = []
    s3 = boto3.resource('s3',config=Config(signature_version=UNSIGNED))
    my_bucket = s3.Bucket(BUCKET_NAME)
    for my_bucket_object in my_bucket.objects.all():
        imageURLs.append(u'https://s3-{0}.amazonaws.com/{1}/{2}'.format(AWS_DEFAULT_REGION,BUCKET_NAME,my_bucket_object.key))
    return imageURLs[0:6]


# if __name__ == '__main__':
#     getAWSImages()